// import React, { Component } from 'react';
// import { Scrollbars } from 'react-custom-scrollbars';

// import './CustomScrollbars.scss';

// class CustomScrollbars extends Component {

//     ref = React.createRef();

//     getScrollLeft =()=>{
//         const scrollbars = this.ref.current;
//         return scrollbars.getScrollLeft();
//     }
//     getScrollTop =()=>{
//         const scrollbars = this.ref.current;
//         return scrollbars.getScrollTop();
//     }

//     scrollToBottom = () => {
//         if (!this.ref || !this.ref.current) {
//             return;
//         }
//         const scrollbars = this.ref.current;
//         const targetScrollTop = scrollbars.getScrollHeight();
//         this.scrollTo(targetScrollTop);
//     };

//     scrollTo = (targetTop) => {
//         const { quickScroll } = this.props;
//         if (!this.ref || !this.ref.current) {
//             return;
//         }
//         const scrollbars = this.ref.current;
//         const originalTop = scrollbars.getScrollTop();
//         let iteration = 0;

//         const scroll = () => {
//             iteration++;
//             if (iteration > 30) {
//                 return;
//             }
//             scrollbars.scrollTop(originalTop + (targetTop - originalTop) / 30 * iteration);

//             if (quickScroll && quickScroll === true) {
//                 scroll();
//             } else {
//                 setTimeout(() => {
//                     scroll();
//                 }, 20);
//             }
//         };

//         scroll();
//     };

//     renderTrackHorizontal = (props) => {
//         return (
//             <div {...props} className="track-horizontal" />
//         );
//     };

//     renderTrackVertical = (props) => {
//         return (
//             <div {...props} className="track-vertical" />
//         );
//     };

//     renderThumbHorizontal = (props) => {
//         return (
//             <div {...props} className="thumb-horizontal" />
//         );
//     };

//     renderThumbVertical = (props) => {
//         return (
//             <div {...props} className="thumb-vertical" />
//         );
//     };

//     renderNone = (props) => {
//         return (
//             <div />
//         );
//     };

//     render() {
//         const { className, disableVerticalScroll, disableHorizontalScroll, children,...otherProps } = this.props;
//         return (
//             <Scrollbars
//                 ref={this.ref}
//                 autoHide={true}
//                 autoHideTimeout={200}
//                 hideTracksWhenNotNeeded={true}
//                 className={className ? className + ' custom-scrollbar' : 'custom-scrollbar'}
//                 {...otherProps}
//                 renderTrackHorizontal={disableHorizontalScroll ? this.renderNone : this.renderTrackHorizontal}
//                 renderTrackVertical={disableVerticalScroll ? this.renderNone : this.renderTrackVertical}
//                 renderThumbHorizontal={disableHorizontalScroll ? this.renderNone : this.renderThumbHorizontal}
//                 renderThumbVertical={disableVerticalScroll ? this.renderNone : this.renderThumbVertical}
//             >
//                 {children}
//             </Scrollbars>
//         );
//     }
// }

// export default CustomScrollbars;

// Sử dụng useCallBack
import React, { useRef, useCallback } from "react";
import { Scrollbars } from "react-custom-scrollbars";

import "./CustomScrollbars.scss";

const CustomScrollbars = ({
  className,
  disableVerticalScroll,
  disableHorizontalScroll,
  children,
  quickScroll,
  ...otherProps
}) => {
  const scrollbarsRef = useRef(null);

  const getScrollLeft = useCallback(() => {
    const scrollbars = scrollbarsRef.current;
    return scrollbars ? scrollbars.getScrollLeft() : 0;
  }, []);

  const getScrollTop = useCallback(() => {
    const scrollbars = scrollbarsRef.current;
    return scrollbars ? scrollbars.getScrollTop() : 0;
  }, []);

  const scrollToBottom = useCallback(() => {
    const scrollbars = scrollbarsRef.current;
    if (scrollbars) {
      const targetScrollTop = scrollbars.getScrollHeight();
      scrollTo(targetScrollTop);
    }
  }, []);

  const scrollTo = useCallback(
    (targetTop) => {
      const scrollbars = scrollbarsRef.current;
      if (scrollbars) {
        const originalTop = scrollbars.getScrollTop();
        let iteration = 0;

        const scroll = () => {
          iteration++;
          if (iteration > 30) return;
          scrollbars.scrollTop(
            originalTop + ((targetTop - originalTop) / 30) * iteration
          );

          if (quickScroll) {
            scroll();
          } else {
            setTimeout(scroll, 20);
          }
        };

        scroll();
      }
    },
    [quickScroll]
  );

  const renderTrackHorizontal = useCallback(
    (props) => <div {...props} className="track-horizontal" />,
    []
  );

  const renderTrackVertical = useCallback(
    (props) => <div {...props} className="track-vertical" />,
    []
  );

  const renderThumbHorizontal = useCallback(
    (props) => <div {...props} className="thumb-horizontal" />,
    []
  );

  const renderThumbVertical = useCallback(
    (props) => <div {...props} className="thumb-vertical" />,
    []
  );

  const renderNone = useCallback((props) => <div />, []);

  return (
    <Scrollbars
      ref={scrollbarsRef}
      autoHide={true}
      autoHideTimeout={200}
      hideTracksWhenNotNeeded={true}
      className={
        className ? `${className} custom-scrollbar` : "custom-scrollbar"
      }
      {...otherProps}
      renderTrackHorizontal={
        disableHorizontalScroll ? renderNone : renderTrackHorizontal
      }
      renderTrackVertical={
        disableVerticalScroll ? renderNone : renderTrackVertical
      }
      renderThumbHorizontal={
        disableHorizontalScroll ? renderNone : renderThumbHorizontal
      }
      renderThumbVertical={
        disableVerticalScroll ? renderNone : renderThumbVertical
      }
    >
      {children}
    </Scrollbars>
  );
};

export default CustomScrollbars;

// import React, { useRef } from "react";
// import { Scrollbars } from "react-custom-scrollbars";

// import "./CustomScrollbars.scss";

// const CustomScrollbars = ({
//   className,
//   disableVerticalScroll,
//   disableHorizontalScroll,
//   children,
//   quickScroll,
//   ...otherProps
// }) => {
//   const scrollbarsRef = useRef(null);

//   const getScrollLeft = () => {
//     const scrollbars = scrollbarsRef.current;
//     return scrollbars ? scrollbars.getScrollLeft() : 0;
//   };

//   const getScrollTop = () => {
//     const scrollbars = scrollbarsRef.current;
//     return scrollbars ? scrollbars.getScrollTop() : 0;
//   };

//   const scrollToBottom = () => {
//     const scrollbars = scrollbarsRef.current;
//     if (scrollbars) {
//       const targetScrollTop = scrollbars.getScrollHeight();
//       scrollTo(targetScrollTop);
//     }
//   };

//   const scrollTo = (targetTop) => {
//     const scrollbars = scrollbarsRef.current;
//     if (scrollbars) {
//       const originalTop = scrollbars.getScrollTop();
//       let iteration = 0;

//       const scroll = () => {
//         iteration++;
//         if (iteration > 30) return;
//         scrollbars.scrollTop(
//           originalTop + ((targetTop - originalTop) / 30) * iteration
//         );

//         if (quickScroll) {
//           scroll();
//         } else {
//           setTimeout(scroll, 20);
//         }
//       };

//       scroll();
//     }
//   };

//   const renderTrackHorizontal = (props) => (
//     <div {...props} className="track-horizontal" />
//   );

//   const renderTrackVertical = (props) => (
//     <div {...props} className="track-vertical" />
//   );

//   const renderThumbHorizontal = (props) => (
//     <div {...props} className="thumb-horizontal" />
//   );

//   const renderThumbVertical = (props) => (
//     <div {...props} className="thumb-vertical" />
//   );

//   const renderNone = (props) => <div />;

//   return (
//     <Scrollbars
//       ref={scrollbarsRef}
//       autoHide={true}
//       autoHideTimeout={200}
//       hideTracksWhenNotNeeded={true}
//       className={
//         className ? `${className} custom-scrollbar` : "custom-scrollbar"
//       }
//       {...otherProps}
//       renderTrackHorizontal={
//         disableHorizontalScroll ? renderNone : renderTrackHorizontal
//       }
//       renderTrackVertical={
//         disableVerticalScroll ? renderNone : renderTrackVertical
//       }
//       renderThumbHorizontal={
//         disableHorizontalScroll ? renderNone : renderThumbHorizontal
//       }
//       renderThumbVertical={
//         disableVerticalScroll ? renderNone : renderThumbVertical
//       }
//     >
//       {children}
//     </Scrollbars>
//   );
// };

// export default CustomScrollbars;
