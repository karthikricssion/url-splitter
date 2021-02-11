<template>
    <div class="c-flex c-flex-column full-height popup-wrapper">
        <div class="c-flex c-flex-column content">
            <div class="c-flex list-header-wrapper">
                <div class="c-flex favicon-wrapper">
                    <div class="full-width text-center">
                        <img :src="tabInfo.favIconUrl" :alt="tabInfo.title" />
                    </div>
                </div>
                <div class="c-flex">
                    <div class="full-width active-tab-page-info">
                        <h4 class="margin-0">Current Tab</h4>
                        <p class="margin-0">{{tabInfo.title}}</p>
                    </div>
                </div>
            </div>
			<div class="c-flex full-height scroll-y list-splitted-url-wrapper">
                <ul class="full-width">
                    <li v-for="(url, index) in splittedURL" :key="index">
                        <label v-if="index === 0">Origin</label>
                        <label v-if="index === splittedURL.length - 1">Current URL</label>
                        <a v-bind:href="url" :title="url" target="_blank">{{ url }}</a>
                        <div class="full-width url-action-btn-wrapper">
                            <button class="btn btn-default btn-icon-text margin-r-8" title="Copy URL">
                                <img src="../assets/icons/copy.png" alt="copy-icon" />
                                <span>Copy</span>
                            </button>
                            <button class="btn btn-default btn-icon-text margin-r-8" title="Go to URL">
                                <img src="../assets/icons/close.png" alt="open-new-tab-icon" />
                                <span>Open</span>
                            </button>
                            <button class="btn btn-default btn-icon-text" title="Open URL in current tab" @click="OpenInCurrentTab(url)">
                                <img src="../assets/icons/close.png" alt="open-same-tab-icon" />
                                <span>Open in current tab</span>
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
		</div>
        <Footer></Footer>
    </div>
</template>
<script>
import Footer from '@/components/Footer.vue';
export default {
    name: "App",
    components: { 
        Footer 
	},
    data() {
        return {
            tabInfo: {},
            url: "",
            splittedURL: [],
        };
    },
    mounted() {
        browser.tabs.query({ active: true, currentWindow: true }).then((tab) => {
            this.tabInfo = tab[0]
            console.log(tab[0])
            this.url = tab[0].url;

            let urlObj = new URL(this.url);
            this.splittedURL.push(urlObj.origin);

            if (urlObj.pathname.length === 1) {
                if (urlObj.hash) {
                    // The has will be at last
                    let splitHash = urlObj.hash.split("#");
                    let splitPathName = splitHash[1];

                    let frameURL = `${urlObj.origin}/#`;

                    let splittedPathaname = splitPathName.split("/").filter(function(e) {
                        return e;
                    });
                    
                    for (let i = 0; i < splittedPathaname.length; i++) {
                        frameURL = frameURL + `/${splittedPathaname[i]}`;
                        this.splittedURL.push(frameURL);
                    }

                    console.log("Has Hash & has no pathname");
                }
                } else {
                    if (urlObj.hash) {
                        // The has will be at last
                        let splitHash = urlObj.hash.split("#");
                        let splitPathName = splitHash[1];
                        console.log(splitHash, splitPathName, urlObj.pathname);

                        let frameURL = urlObj.origin;

                        let splittedPathaname = urlObj.pathname.split("/").filter(function(e) {
                            return e;
                        });

                        for (let i = 0; i < splittedPathaname.length; i++) {
                            frameURL = frameURL + `/${splittedPathaname[i]}`;
                            this.splittedURL.push(frameURL);
                        }

                        // Since it has pathname and hash
                        frameURL = frameURL + `/${urlObj.hash}`;
                        this.splittedURL.push(frameURL);

                        console.log("Has Hash & has to split the pathname");
                    } else {
                        let frameURL = urlObj.origin;

                        let splittedPathaname = urlObj.pathname.split("/").filter(function(e) {
                            return e;
                        });
                        for (let i = 0; i < splittedPathaname.length; i++) {
                            frameURL = frameURL + `/${splittedPathaname[i]}`;
                            this.splittedURL.push(frameURL);
                        }
                        console.log("Has no Hash has to split the pathname");
                    }
            }
        });
    },
    methods: {
        OpenInCurrentTab(url) {
            function onUpdated(tab) {
                console.log(`Updated tab: ${tab.id}`);
            }

            function onError(error) {
                console.log(`Error: ${error}`);
            }

            var updating = browser.tabs.update({url: url});
            updating.then(onUpdated, onError);
        }
    }
};
</script>

<style lang="scss">
@import '../assets/css/app.css';

/* Popup wrapper */
/* Content */
.popup-wrapper {
	width: 350px;
	.content {
		max-height: 490px;
		.list-header-wrapper {
			padding: 8px;
			background-color: #F9F9FA;
            border-bottom: 1px solid #E3E3E5;
            .favicon-wrapper {
                flex: 0 0 50px;
                img {
                    margin-top: 8px;
                    width: 32px;
                }
            }
			h4 {
				margin-bottom: 8px;
			}
			p {
				margin-bottom: 8px;
				font-size: 14px;
				line-height: 20px;
			}
        }
        .active-tab-page-info {
            padding: 8px;
        }
        .list-splitted-url-wrapper {
            ul {
                list-style: none;
                padding: 0;
                margin: 0;
                li {
                    border-bottom: 1px solid #E3E3E5;
                    padding: 16px;
                    label {
                        display: block;
                        margin-bottom: 4px;
                        color: #5d5d5d;
                        font-weight: 600;
                    }
                    a {
                        font-size: 14px;
                    }
                    span {
                        font-size: 12px;
                    }
                    .url-action-btn-wrapper {
                        margin-top: 16px;
                    }
                    &:last-child {
                        border: 0;
                    }
                    &:hover {
                        background-color: #f0f0f0;
                        .url-action-btn-wrapper {
                            .btn {
                                background-color: #fff ;
                            }
                        }
                    }
                }
            }
        }
	}
}
</style>
