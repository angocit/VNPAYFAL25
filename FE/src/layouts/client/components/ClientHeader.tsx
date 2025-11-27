const ClientHeader = () => {
  return (
    <header>
      <div className="topbar bg-black text-white text-center py-2">
        <div className="max-w-7xl mx-auto relative">
          <span>
            Sign up and get 20% off to your first order.{" "}
            <a className="font-bold underline" href="#">
              Sign Up Now
            </a>
          </span>
          <button className="absolute top-0 right-0">X</button>
        </div>
      </div>
      <div className="menubar shadow-sm">
        <div className="max-w-7xl mx-auto relative grid grid-cols-[10%_30%_60%] items-center">
          <div className="logo">
            <a href="/">
              <strong>VNPAY</strong>
            </a>
          </div>
          <nav>
            <ul className="flex [&_a]:py-5 [&_a]:block [&_a]:px-4">
              <li>
                <a>Shop</a>
              </li>
              <li>
                <a>On Sale</a>
              </li>
              <li>
                <a>New Arrivals</a>
              </li>
              <li>
                <a>Brand</a>
              </li>
            </ul>
          </nav>
          <div className="gap-10 right-header flex justify-between items-center">
            <form className="w-full relative">
              <input
                className="w-full border-0 rounded-[100px] bg-[#F0F0F0] pl-10 py-2 pr-3 outline-0"
                placeholder="Search for products..."
                type="text"
              />
              <button className="absolute top-0 left-0 h-full w-10 flex justify-center items-center">
                <img src="/images/searchicon.svg" />
              </button>
            </form>
            <div className="info flex gap-5">
              <div className="cart">
                <a href="/cart">
                  <img src="/images/cart.svg" />
                </a>
              </div>
              <div className="user">
                <img src="/images/user.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ClientHeader;
