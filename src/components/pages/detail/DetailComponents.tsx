import React from 'react';
import HeroDetail from './hero/Hero';
import AccordionDetail from './accordion/Accordion';
import SizeDetail from './size/Size';

const DetailComponents = () => {
  return (
    <>
      <HeroDetail/>
      <SizeDetail/>
      <AccordionDetail/>
    </>
  );
};

export default DetailComponents;