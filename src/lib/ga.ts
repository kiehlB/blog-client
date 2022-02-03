export const pageview = url => {
  if (typeof window !== 'undefined') {
    (window as any).gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
      page_path: url,
    });
  }
};

// log specific events happening.
export const event = ({ action, params }) => {
  if (typeof window !== 'undefined') {
    (window as any)('event', action, params);
  }
};
