import Button, { ButtonType, ButtonSize } from './components/button';

const App = () => {
  return (
    <div className="app">
      <Button>button</Button>
      <Button disabled>button</Button>
      <Button type={ButtonType.Primary}>button primary</Button>
      <Button type={ButtonType.Danger}>button danger</Button>
      <Button type={ButtonType.Danger} size={ButtonSize.Large}>
        button large
      </Button>
      <Button type={ButtonType.Danger} size={ButtonSize.Small}>
        button small
      </Button>
      <Button type={ButtonType.Danger} size={ButtonSize.Large} disabled>
        button
      </Button>
      <Button
        type={ButtonType.Link}
        size={ButtonSize.Large}
        href="https://www.sogou.com/"
      >
        button link
      </Button>
      <Button
        type={ButtonType.Link}
        size={ButtonSize.Large}
        disabled
        href="https://www.sogou.com/"
      >
        button link disabled
      </Button>
    </div>
  );
};

export default App;
