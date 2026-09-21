import { useEffect, useRef, useState } from 'react';

const ScrollLimit = ({children}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const isScrolling = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      
      // Update state if needed for UI
      setScrollTop(currentScroll);

      // Prevent scrolling past 500px
      if (currentScroll > 500) {
        window.scrollTo(0, 500);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ height: '1000px' }}>
      {/* <p>Scroll Position: {scrollTop}px</p> */}
      {/* <p>Content...</p> */}
      {children}
    </div>
  );
};

export default ScrollLimit;   