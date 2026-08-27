import React, {useState, useEffect, useRef} from 'react'

const StickyFixed = ({ children }) => {
  const [isFixed, setIsFixed] = useState(false);
  const [offset, setOffset] = useState(0);
  const [thetop, setThetop] = useState(0);
  const ref = useRef(null);
  
  useEffect(() => {
    if (ref.current) {
      setOffset(ref.current.getBoundingClientRect().top);
    }

    const handleScroll = () => {
      if (window.scrollY > offset) {
        setIsFixed(true);
        setThetop(window.scrollY)
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
      style={{ border: '2px solid red', height: '20px', visibility: isFixed ? 'hidden' : 'visible' }} 
      //style={{ height: '28px', border: '2px solid red'}}
      />
      {isFixed && (
        <div style={{ position: 'fixed', top: thetop, zIndex: 99, border: '2px solid green' }}>
          {children}
        </div>
      )}
    </div>
    
  );
};   

export default StickyFixed;