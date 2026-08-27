import React, {useState, useEffect, useRef} from 'react'

const StickyFixed = ({ children }) => {
  const [isFixed, setIsFixed] = useState(false);
  const [offset, setOffset] = useState(0);
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
      <div ref={ref} style={{ height: '20px', border: '2px solid blue' }}>{children}</div>
      <div 
      style={{ height: '20px', visibility: isFixed ? 'hidden' : 'visible', border: '2px solid red' }} 
      //style={{ height: '28px', border: '2px solid red'}} 
      />
      {isFixed && (
        <div style={{ position: 'fixed', top: offset, zIndex: 1099, border: '2px solid green' }}>
          {children}
        </div>
      )}
    </div>
    
  );
};   

export default StickyFixed;