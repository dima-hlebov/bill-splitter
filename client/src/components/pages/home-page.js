import React from 'react';

import TryNow from '../home/try-now/try-now';
import About from '../home/about/about';
import HowToUse from '../how-to-use/how-to-use';

// import './home-page.sass';

function HomePage() {
  return (
    <>
      <TryNow />
      <About />
      <HowToUse />
    </>
  );
}

export default HomePage;
