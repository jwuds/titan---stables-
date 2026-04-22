
import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * NoIndexWrapper Component
 * 
 * Wraps admin routes with noindex and nofollow meta tags
 * to prevent search engines from indexing admin pages.
 * 
 * CRITICAL: This component MUST wrap all admin routes.
 */
const NoIndexWrapper = ({ children }) => {
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="bingbot" content="noindex, nofollow" />
      </Helmet>
      {children}
    </>
  );
};

export default NoIndexWrapper;
