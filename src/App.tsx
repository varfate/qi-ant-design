import Button, { ButtonType, ButtonSize } from './components/button';

const App = () => {
  return (
    <div className="app">
      <Button>button</Button>
      <Button onClick={(e) => alert(e.target)} disabled>button</Button>
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
      >
        button link
      </Button>
      <Button
        type={ButtonType.Link}
        size={ButtonSize.Large}
        target="_blank"
        disabled
        href="https://www.sogou.com/"
      >
        button link disabled
      </Button>
    </div>
  );
};

export default App;
