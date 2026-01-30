import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('cookieConsent');
    if (!consent) setShowBanner(true);
  }, []);

  const acceptCookies = () => {
    Cookies.set('cookieConsent', 'true', { expires: 365 });
    setShowBanner(false);
  };

  return (
    showBanner && (
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          background: '#333',
          color: 'white',
          padding: '15px',
          width: '100%',
          textAlign: 'center',
          zIndex: 1000,
        }}
      >
        We use cookies to improve your experience.{' '}
        <button
          onClick={acceptCookies}
          style={{
            marginLeft: '10px',
            padding: '5px 10px',
            background: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Accept
        </button>
      </div>
    )
  );
};

export default CookieConsent;
