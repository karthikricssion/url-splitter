<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <slot name="header">
                            <p class="margin-0 font-w-600">Feedback / Request Feature</p>
                        </slot>
                    </div>

                    <form ref="feedbackForm" v-on:submit.prevent="sendFeedback" action="https://formspree.io/f/xgepqgre" name="message" method="POST">
                        <div class="modal-body">
                            <slot name="body">
                                <div class="create-feedback-form-wrapper">
                                    <div class="form-group">
                                        <label>Message</label>
                                        <textarea id="message" name="message" rows="5" class="form-input"></textarea>
                                        <small class="error-message" v-if="errorMessage">{{errorMessage}}</small>
                                    </div>
                                </div>
                            </slot>
                        </div>

                        <div class="modal-footer">
                            <slot name="footer">
                                <button v-if="!showLoading" type="submit" class="btn btn-icon-text modal-default-button margin-r-8 btn-primary" @click="sendFeedback">
                                    <img src="../assets/icons/send.png" alt="send-icon" />
                                    <span>Send</span>
                                </button>

                                <button v-else class="btn btn-icon-text modal-default-button margin-r-8 btn-primary loader-holder">
                                    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                                </button>

                                <button class="btn btn-icon-text modal-default-button" @click="$emit('close')">
                                    <img src="../assets/icons/close.png" alt="close-icon" />
                                    <span>Cancel</span>
                                </button>
                            </slot>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import API from '../api'
import Helper from '../helper'
export default {
    name: 'FeedbackModal',
    data() {
        return {
            showLoading: false,
            errorMessage: ''
        }
    }, 
    methods: {
        sendFeedback() {
            let self = this
            let form = this.$refs.feedbackForm
            this.errorMessage = ''
            this.showLoading = true
            form.addEventListener('submit', (ev) => {
                ev.preventDefault();
                ev.stopPropagation();  
                ev.stopImmediatePropagation();

                let data = new FormData(form);

                function successSendingFeedback() {
                    form.reset();
                    self.showLoading = false
                    self.$emit('sent')
                    self.$emit('close')
                }

                function errorSendingFeedback(err) {
                    self.showLoading = false
                    self.errorMessage = 'Problem sending feedback'
                    console.log(`Error in sending form: ${err}`)
                }
                
                for(var pair of data.entries()) {
                    if(!Helper.isEmpty(pair[1])) {
                        API.sendFeedbak(form.method, form.action, data).then(() => {
                            successSendingFeedback()
                        }, (err) => {
                            errorSendingFeedback(err)
                        })
                    } else {
                        self.errorMessage = 'Please give some feedback!'
                        self.showLoading = false
                    }
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.modal-wrapper {
    text-align: left;
}

.modal-footer {
    text-align: right;
}

.lds-ring {
    display: inline-block;
    position: relative;
    width: 16px;
    height: 16px;
}
  
.lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 16px;
    height: 16px;
    margin: 0px;
    border: 2px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
}

.loader-holder {
    height: 31px;
}

</style>