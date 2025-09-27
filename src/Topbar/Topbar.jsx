import './Topbar.css';

const TopBar = ({ children }) => (
  <div className='w-full h-[100px] flex items-center justify-center'>
    <div className="flex items-center justify-between px-5 shadow-[0_4px_10px_rgba(0,0,0,0.1)] rounded-md bg-neutral-100 w-[60%] h-[70%]">
      <div className="topBarItemsContainer">
        <img src="logo.png" alt="Logo" className="logoImg" />
        <h1 className="text-2xl font-semibold tracking-tight text-nowrap text-primary hidden sm:block">
          PlayMap
        </h1>
      </div>

      <div className="topBarItemsContainer">
        {children}
      </div>
    </div>
  </div>
);

export default TopBar;