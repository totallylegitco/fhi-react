import { FloatingIndicator, UnstyledButton } from '@mantine/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './styles.module.css';

interface AnchorItem {
  label: string;
  href: string;
}
const navItems: AnchorItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Delete Data', href: '/delete-data' },
  { label: 'Appeal', href: '/denial-questions' },
];

export function NavBar() {
  const [rootRef, setRootRef] = useState<HTMLElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLAnchorElement | null>>({});
  const [active, setActive] = useState(0);

  const setControlRef = (index: number) => (node: HTMLAnchorElement) => {
    controlsRefs[index] = node;
    setControlsRefs(controlsRefs);
  };

  const controls = navItems.map((item, index) => (
    <UnstyledButton
      key={item.label}
      className={classes.control}
      ref={setControlRef(index)}
      onClick={() => setActive(index)}
      mod={{ active: active === index }}
      component={Link}
      to={item.href}
    >
      <span className={classes.controlLabel}>{item.label}</span>
    </UnstyledButton>
  ));

  return (
    <nav className={classes.root} ref={setRootRef}>
      {controls}

      <FloatingIndicator
        target={controlsRefs[active]}
        parent={rootRef}
        className={classes.indicator}
      />
    </nav>
  );
}
