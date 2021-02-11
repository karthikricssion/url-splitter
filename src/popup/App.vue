<template>
  <div>
    <div>{{url}}</div>
    <ul>
      <li v-for="(url, index) in splittedURL" :key="index">
        <a v-bind:href="url" :title="url" target="_blank">{{url}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      url: '',
      splittedURL: []
    }
  },
  mounted() {
    browser.tabs.query({active: true, currentWindow: true}).then((tab) => {
      this.url = tab[0].url
      console.log(new URL(this.url))
      /*
        Conditions to look for
        1. Check if the url has hash #
          - If it has hash, then split the hash url by removing '#' from url
          - Else get the pathname and split the url 
        2. Check for search
          - if it has search append user full url (href)
        3. if pathname length is not equal to one

        Features to add
        1. Copy and Goto 

        params to look for in URL 
        - origin
        - hash
        - search
        - Full URL
      */

      let urlObj = new URL(this.url)
      this.splittedURL.push(urlObj.origin)
      
      if(urlObj.pathname.length === 1) {
        if(urlObj.hash) {
          // The has will be at last
          let splitHash = urlObj.hash.split('#')
          let splitPathName = splitHash[1]

          let splittedPathaname = splitPathName.split('/').filter(function(e){return e});
          let frameURL = `${urlObj.origin}/#`
          for(let i = 0; i < splittedPathaname.length; i++ ) {
            frameURL = frameURL + `/${splittedPathaname[i]}`
            this.splittedURL.push(frameURL)  
          }
          
          console.log('Has Hash & has no pathname')
        }
      } else {
        if(urlObj.hash) {
          // The has will be at last
          let splitHash = urlObj.hash.split('#')
          let splitPathName = splitHash[1]
          console.log(splitHash, splitPathName, urlObj.pathname)

          let splittedPathaname = urlObj.pathname.split('/').filter(function(e){return e});
          let frameURL = urlObj.origin
          for(let i = 0; i < splittedPathaname.length; i++ ) {
            frameURL = frameURL + `/${splittedPathaname[i]}`
            this.splittedURL.push(frameURL)  
          }

          // Since it has pathname and hash
          frameURL = frameURL + `/${urlObj.hash}`
          this.splittedURL.push(frameURL)  

          console.log('Has Hash & has to split the pathname')


        } else {
          let splittedPathaname = urlObj.pathname.split('/').filter(function(e){return e});
          let frameURL = urlObj.origin
          for(let i = 0; i < splittedPathaname.length; i++ ) {
            frameURL = frameURL + `/${splittedPathaname[i]}`
            this.splittedURL.push(frameURL)  
          }
          console.log('Has no Hash has to split the pathname')
        }
      }
    })
  }
}
</script>

<style>
html {
  width: 500px;
}
</style>
