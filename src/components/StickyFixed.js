import React, {useState, useEffect, useRef} from 'react'

const StickyFixed = ({ children }) => {
  const [isFixed, setIsFixed] = useState(false);
  const [offset, setOffset] = useState(20);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      setOffset(ref.current.getBoundingClientRect().top);
    }

    const handleScroll = () => {
      if (window.scrollY > offset) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset]);

  return (
    <div>
      <div ref={ref} style={{ height: '50px' }}>{children}</div>
      <div style={{ height: '50px', visibility: isFixed ? 'hidden' : 'visible' }} />
      {isFixed && (
        <div style={{ position: 'fixed', bottom: offset, zIndex: 99 }}>
          {children}
        </div>
      )}
    </div>
  );
};   

export default StickyFixed;