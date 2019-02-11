(function() {
   
  function getProfileLink() {
    return document.querySelector("a[title='Profile']").href;
  }

  function redirect(url) {
    browser.runtime.sendMessage({ redirect: url });
    console.log("Testing Redirect");
  }
  
  function deletePosts() {
    
    function selectCurrentlyVisiblePosts() {
      document.querySelectorAll("#pagelet_main_column_personal #timeline_overview  a button");
    }
    
  }

  function unfollowPages() {

    /* 
    * For dev purposes:
    * To follow the unliked pages, run this in the console ONLY IF YOU HAVE 30 OR SO unliked pages:
    * [...document.querySelectorAll(".PageLikeButton")].filter(b => b.textContent ==("Like")).forEach(e=>e.click())
    */
    const profileLink = getProfileLink();
    const likesUrl = profileLink + '/likes';
    // redirect(likesUrl);

    if(location.href != likesUrl) {
      alert("Please run this on your likes page (facebook.com/USERNAME/likes");
      console.error(window.url, likesUrl);
      return;
    }

    function unfollow() {

      const buttons = document.querySelectorAll(" button.PageLikedButton.PageLikeButton");
      openButtons(buttons);
      setTimeout(() => {
        
        unlikeAll();
      }, 2000); 
    }

    function openButtons(buttons) {
      buttons.forEach(b => b.click());
    }

    function unlikeAll() {
      document.querySelectorAll("span.itemLabel").forEach(u => u.click())
    }

    unfollow();

  }

  function hideFeed() {

    // do the thing
    alert("Not Yet Implemented");
  }

  /**
   * Listen for messages from the background script.
   * Call "beastify()" or "reset()".
  */
  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "deletePosts") {
      // deletePosts();
    } else if (message.command === "unfollowPages") {
      unfollowPages();
    } else if (message.command === "hideFeed") {
      hideFeed();
    }
  });

})();