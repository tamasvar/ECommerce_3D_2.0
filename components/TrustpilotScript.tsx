'use client'
import { useEffect } from "react";

export default function TrustpilotScript() {
  useEffect(() => {
    // Use TypeScript type assertion to avoid errors
    (function (w: any, d: Document, s: string, r: string, n: any) {
      w.TrustpilotObject = n;
      w[n] = w[n] || function () {
        (w[n].q = w[n].q || []).push(arguments);
      };
      var a: any = d.createElement(s);
      a.async = 1;
      a.src = r;
      a.type = 'text/java' + s;
      var f: any = d.getElementsByTagName(s)[0];
      f.parentNode.insertBefore(a, f);
    })(window, document, 'script', 'https://invitejs.trustpilot.com/tp.min.js', 'tp');

    // Check if `tp` is available before calling it
    if (window.tp) {
      (window as any).tp('register', 'lKsbfE18OxcaydQq');
    }
  }, []);

  return null;
}