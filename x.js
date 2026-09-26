function isFacebookPost(url) {
  // Check if string is valid and contains facebook.com
  if (!url || !url.includes('facebook.com')) {
    return false;
  }
  return true

  // try {
  //   const parsedUrl = new URL(url);
  //   // Check if host is facebook.com or www.facebook.com
  //   if (!['facebook.com', 'www.facebook.com'].includes(parsedUrl.hostname)) {
  //     return false;
  //   }

  //   // Check for common post path patterns
  //   // Matches: /posts/123, /permalink/123, /photo/?fbid=123, /videos/123
  //   const postPathPattern = /(\/posts\/|\/permalink\/|\/photo\?|\/videos\/|\/video\?)/i;
  //   return postPathPattern.test(parsedUrl.pathname);
  // } catch (e) {
  //   return false;
  // }
}

console.log(isFacebookPost("https://www.facebook.com/photo/?fbid=122098550787463882"))
