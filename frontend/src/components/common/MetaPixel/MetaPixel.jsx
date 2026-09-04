import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// YAHAN APNA META PIXEL ID DAALEN (e.g., '123456789012345')
const PIXEL_ID = '4484542351870388';

let isPixelInitialized = false;

const MetaPixel = () => {
  const location = useLocation();

  useEffect(() => {

    // Initialize the Meta Pixel script only once
    if (!isPixelInitialized) {
      /* eslint-disable */
      !function (f, b, e, v, n, t, s) {
        if (f.fbq) return; n = f.fbq = function () {
          n.callMethod ?
            n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
        n.queue = []; t = b.createElement(e); t.async = !0;
        t.src = v; s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s)
      }(window, document, 'script',
        'https://connect.facebook.net/en_US/fbevents.js');
      /* eslint-enable */

      window.fbq('init', PIXEL_ID);
      isPixelInitialized = true;
    }

    // Track PageView every time the route (URL) changes
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [location]); // Ye dependency ensure karti hai ki jab bhi page change ho, PageView track ho.

  // Meta Pixel doesn't render any visible UI
  return null;
};

export default MetaPixel;
