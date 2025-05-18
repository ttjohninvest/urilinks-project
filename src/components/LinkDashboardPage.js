import React, {useEffect, useState, useRef} from "react";
import LinkList from "./LinkList";
import LinkListFilters from "./LinkListFilters";
import LinksSummary from "./LinksSummary";

const LinkDashboardPage = () => {
  //const elementRef = useRef()
  const scrollableDiv = React.useRef();
  const [scrollPos, setScrollPos] = useState(0);
  //const [scrollTop, setScrollTop] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      window.localStorage.setItem("scrollY",window.scrollY)
      console.log(window.scrollY)
      setScrollPos(window.scrollY);

    }

    // Adding scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
       
  //     window.localStorage.setItem("scrollY",0)
  //     // Your function to run before the tab is closed
  //     console.log('Tab is closing...');
  //     // Optional: Display a confirmation dialog
  //     event.preventDefault();
  //     event.returnValue = ''; // Required for Chrome
  //   };
  
  //   window.addEventListener('beforeunload', handleBeforeUnload);
  
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);

  useEffect(()=>{
    //elementRef.current.offsetHeight
    const sp = parseInt(window.localStorage.getItem("scrollY")) //parseInt(window.localStorage.getItem("scrollPosition"))
    console.log("sp="+sp)
    window.scrollTo(0,sp)
  },[])

 return (
    <div className="website-background-color"
    //ref={elementRef}
    >
      <LinksSummary />
      <LinkListFilters />
      <LinkList />
    </div>
  );
};

export default LinkDashboardPage;

// import React from "react";
// import LinkList from "./LinkList";
// import LinkListFilters from "./LinkListFilters";
// import LinksSummary from "./LinksSummary";

// class LinkDashboardPage extends React.Component {
 
//   constructor(props) {
//     super(props)
//     this.state = {
//       scrollTop: 0,
//       scrollPos: 0
//     }
//     this.scrollableDiv = React.createRef()
//     this.handleScroll = this.handleScroll.bind(this);
//   }


//   componentDidMount() {
//     this.scrollableDiv.current.addEventListener('scroll', this.handleScroll);
//     const sp = parseInt(window.localStorage.getItem("scrollY")) //parseInt(window.localStorage.getItem("scrollPosition"))
//     console.log("sp="+sp)
//     window.scrollTo(0,sp)
//   }

//   componentWillUnmount() {
//     this.scrollableDiv.current.removeEventListener('scroll', this.handleScroll);
//   }

//   handleScroll(event) {
//     window.localStorage.setItem("scrollY",event.target.scrollTop)
//     //console.log(event.target.scrollTop)
//     // this.setState({
//     //   scrollTop: event.target.scrollTop,
//     //   scrollPos:window.scrollY
//     // });
//   }

//   render() {
//     return (
 
//     <div className="website-background-color"
//     ref={this.scrollableDiv}
//     >
//       <LinksSummary />
//       <LinkListFilters />
//       <LinkList />
//     </div>
//   );
// };
// }

// export default LinkDashboardPage;