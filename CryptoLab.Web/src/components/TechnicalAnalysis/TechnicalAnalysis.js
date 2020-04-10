import React, { useRef, useEffect } from 'react';

const TechnicalAnalysis = () => {
  const tvRef = useRef();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js';
    script.async = true;
    script.innerHTML = tvRef.current.appendChild(script, {
      interval: '1D',
      width: '100%',
      isTransparent: false,
      height: '100%',
      symbol: 'NASDAQ:AAPL',
      showIntervalTabs: true,
      locale: 'en',
      colorTheme: 'light',
    });
  }, []);

  return (
    <div className="box">
      <div className="tradingview-widget-container" ref={tvRef}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  );
};

export default TechnicalAnalysis;

// <div class="tradingview-widget-container">
//   <div class="tradingview-widget-container__widget"></div>
//   <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/NASDAQ-AAPL/technicals/" rel="noopener" target="_blank"><span class="blue-text">Technical Analysis for AAPL</span></a> by TradingView</div>
//   <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js" async>
//   {
//   "interval": "1D",
//   "width": "100%",
//   "isTransparent": false,
//   "height": "100%",
//   "symbol": "NASDAQ:AAPL",
//   "showIntervalTabs": true,
//   "locale": "en",
//   "colorTheme": "light"
// }
//   </script>
// </div>
