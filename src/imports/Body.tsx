import imgUser from "figma:asset/a6b667c5545cecfce84314742b524688ffffb9d8.png";
import imgImage from "figma:asset/15989773a64e74cc71d188d474f083c4ea20d461.png";

function Heading() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-blue-400 w-[110.69px]">
          <p className="leading-[32px]">TradeHub</p>
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-400 w-[127.64px]">
          <p className="leading-[20px]">Professional Trading</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="relative shrink-0 w-[255px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-700 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] items-start pb-[25px] pt-[24px] px-[24px] relative w-[255px]">
        <Heading />
        <Container />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_6_Free:Black',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[16px] text-white">
        <p className="leading-[16px]"></p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[12px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white w-[78.28px]">
        <p className="leading-[24px]">Dashboard</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="bg-blue-600 relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center px-[16px] py-[12px] relative w-full">
          <Container1 />
          <Margin />
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_6_Free:Black',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[16px] text-gray-300">
        <p className="leading-[16px]"></p>
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[12px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-gray-300 w-[41.2px]">
        <p className="leading-[24px]">Trade</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center px-[16px] py-[12px] relative w-full">
          <Container2 />
          <Margin1 />
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_6_Free:Black',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[16px] text-gray-300">
        <p className="leading-[16px]"></p>
      </div>
    </div>
  );
}

function Margin2() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[12px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-gray-300 w-[58.7px]">
        <p className="leading-[24px]">Portfolio</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center px-[16px] py-[12px] relative w-full">
          <Container3 />
          <Margin2 />
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_6_Free:Black',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-gray-300 w-[18px]">
        <p className="leading-[16px]"></p>
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[12px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-gray-300 w-[64.31px]">
        <p className="leading-[24px]">Watchlist</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center px-[16px] py-[12px] relative w-full">
          <Container4 />
          <Margin3 />
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_6_Free:Black',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[16px] text-gray-300">
        <p className="leading-[16px]"></p>
      </div>
    </div>
  );
}

function Margin4() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[12px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-gray-300 w-[49.78px]">
        <p className="leading-[24px]">History</p>
      </div>
    </div>
  );
}

function Link4() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center px-[16px] py-[12px] relative w-full">
          <Container5 />
          <Margin4 />
        </div>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_6_Free:Black',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[16px] text-gray-300">
        <p className="leading-[16px]"></p>
      </div>
    </div>
  );
}

function Margin5() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[12px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-gray-300 w-[93.36px]">
        <p className="leading-[24px]">Market News</p>
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center px-[16px] py-[12px] relative w-full">
          <Container6 />
          <Margin5 />
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_6_Free:Black',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[16px] text-gray-300">
        <p className="leading-[16px]"></p>
      </div>
    </div>
  );
}

function Margin6() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[12px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-gray-300 w-[57.81px]">
        <p className="leading-[24px]">Settings</p>
      </div>
    </div>
  );
}

function Link6() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center px-[16px] py-[12px] relative w-full">
          <Container7 />
          <Margin6 />
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div className="h-[1361px] relative shrink-0 w-[255px]" data-name="Nav">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[1361px] items-start p-[16px] relative w-[255px]">
        <Link />
        <Link1 />
        <Link2 />
        <Link3 />
        <Link4 />
        <Link5 />
        <Link6 />
      </div>
    </div>
  );
}

function User() {
  return (
    <div className="max-w-[223px] relative rounded-[9999px] shrink-0 size-[40px]" data-name="User">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[9999px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgUser} />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-100 w-[74.72px]">
        <p className="leading-[20px]">John Trader</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-400 w-[94.05px]">
        <p className="leading-[16px]">Premium Account</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container8 />
      <Container9 />
    </div>
  );
}

function Margin7() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[12px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <Container10 />
    </div>
  );
}

function Container11() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center px-[16px] py-[12px] relative w-full">
          <User />
          <Margin7 />
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder1() {
  return (
    <div className="relative shrink-0 w-[255px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-gray-700 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start pb-[16px] pt-[17px] px-[16px] relative w-[255px]">
        <Container11 />
      </div>
    </div>
  );
}

function Aside() {
  return (
    <div className="bg-gray-800 box-border content-stretch flex flex-col items-start pl-0 pr-px py-0 relative self-stretch shrink-0 w-[256px]" data-name="Aside">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-gray-700 border-solid inset-0 pointer-events-none" />
      <HorizontalBorder />
      <Nav />
      <HorizontalBorder1 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-400 w-[54.48px]">
        <p className="leading-[20px]">Balance:</p>
      </div>
    </div>
  );
}

function Margin8() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[8px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-green-400 w-[100.11px]">
        <p className="leading-[28px]">$124,567.89</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Container12 />
      <Margin8 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-400 w-[90.28px]">
        <p className="leading-[20px]">Buying Power:</p>
      </div>
    </div>
  );
}

function Margin9() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[8px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-blue-400 w-[90.09px]">
        <p className="leading-[28px]">$89,234.12</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex gap-[0.01px] items-center relative shrink-0" data-name="Container">
      <Container14 />
      <Margin9 />
    </div>
  );
}

function Margin10() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[24px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <Container15 />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Container13 />
      <Margin10 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_6_Free:Black',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-center text-gray-400 w-[17.5px]">
        <p className="leading-[20px]"></p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <Container17 />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_6_Free:Black',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[20px] text-[20px] text-center text-gray-400">
        <p className="leading-[20px]"></p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <Container18 />
    </div>
  );
}

function ButtonMargin() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[16px] pr-0 py-0 relative shrink-0" data-name="Button:margin">
      <Button1 />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Button />
      <ButtonMargin />
    </div>
  );
}

function Container20() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-between relative w-full">
        <Container16 />
        <Container19 />
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder() {
  return (
    <div className="bg-gray-800 relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-700 border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start pb-[13px] pt-[12px] px-[32px] relative w-full">
          <Container20 />
        </div>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-100 w-[55.02px]">
        <p className="leading-[20px]">{`S&P 500`}</p>
      </div>
    </div>
  );
}

function Margin11() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[8px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-green-400 w-[54.5px]">
        <p className="leading-[20px]">4,783.45</p>
      </div>
    </div>
  );
}

function Margin12() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[8px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-green-400 w-[41.05px]">
        <p className="leading-[16px]">+0.85%</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex items-center relative self-stretch shrink-0" data-name="Container">
      <Container21 />
      <Margin11 />
      <Margin12 />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-100 w-[59.13px]">
        <p className="leading-[20px]">NASDAQ</p>
      </div>
    </div>
  );
}

function Margin13() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[8px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-green-400 w-[62.3px]">
        <p className="leading-[20px]">15,234.78</p>
      </div>
    </div>
  );
}

function Margin14() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[8px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-green-400 w-[41.05px]">
        <p className="leading-[16px]">+1.23%</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex h-[20px] items-center relative shrink-0" data-name="Container">
      <Container23 />
      <Margin13 />
      <Margin14 />
    </div>
  );
}

function Margin15() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-center pl-[24px] pr-0 py-0 relative self-stretch shrink-0" data-name="Margin">
      <Container24 />
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-100 w-[34.22px]">
        <p className="leading-[20px]">DOW</p>
      </div>
    </div>
  );
}

function Margin16() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[8px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-red-400 w-[62.3px]">
        <p className="leading-[20px]">37,845.23</p>
      </div>
    </div>
  );
}

function Margin17() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[8px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-red-400 w-[38.03px]">
        <p className="leading-[16px]">-0.34%</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex h-[20px] items-center relative shrink-0" data-name="Container">
      <Container25 />
      <Margin16 />
      <Margin17 />
    </div>
  );
}

function Margin18() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-center pl-[24px] pr-0 py-0 relative self-stretch shrink-0" data-name="Margin">
      <Container26 />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-100 w-[61.45px]">
        <p className="leading-[20px]">BTC/USD</p>
      </div>
    </div>
  );
}

function Margin19() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[8px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-green-400 w-[62.3px]">
        <p className="leading-[20px]">43,567.89</p>
      </div>
    </div>
  );
}

function Margin20() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[8px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-green-400 w-[41.05px]">
        <p className="leading-[16px]">+2.45%</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex h-[20px] items-center relative shrink-0" data-name="Container">
      <Container27 />
      <Margin19 />
      <Margin20 />
    </div>
  );
}

function Margin21() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-center pl-[24px] pr-0 py-0 relative self-stretch shrink-0" data-name="Margin">
      <Container28 />
    </div>
  );
}

function Container29() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-start relative w-full">
        <Container22 />
        <Margin15 />
        <Margin18 />
        <Margin21 />
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder1() {
  return (
    <div className="bg-gray-800 relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start pb-[9px] pt-[8px] px-[16px] relative w-full">
          <Container29 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-700 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-400 w-[68.23px]">
        <p className="leading-[20px]">Total Value</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_6_Free:Black',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[16px] text-blue-400">
        <p className="leading-[16px]"></p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-[25px] right-[25px] top-[25px]" data-name="Container">
      <Container30 />
      <Container31 />
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[25px] right-[25px] top-[53px]" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-white w-[133.47px]">
        <p className="leading-[32px]">$124,567.89</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[25px] right-[25px] top-[89px]" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-green-400 w-[123.38px]">
        <p className="leading-[20px]">+$3,456.78 (2.85%)</p>
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-gray-800 relative rounded-[8px] self-stretch shrink-0 w-[268px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-gray-700 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container32 />
      <Container33 />
      <Container34 />
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-400 w-[77.39px]">
        <p className="leading-[20px]">{`Today's P&L`}</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_6_Free:Black',sans-serif] justify-center leading-[0] not-italic relative shrink-0 size-[16px] text-[16px] text-green-400">
        <p className="leading-[16px]"></p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-[25px] right-[25px] top-[25px]" data-name="Container">
      <Container35 />
      <Container36 />
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[25px] right-[25px] top-[53px]" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-green-400 w-[120.8px]">
        <p className="leading-[32px]">+$1,234.56</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[25px] right-[25px] top-[89px]" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-green-400 w-[47.88px]">
        <p className="leading-[20px]">+1.02%</p>
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-gray-800 relative rounded-[8px] self-stretch shrink-0 w-[268px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-gray-700 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container37 />
      <Container38 />
      <Container39 />
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-400 w-[90.28px]">
        <p className="leading-[20px]">Total Positions</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_6_Free:Black',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-purple-400 w-[18px]">
        <p className="leading-[16px]"></p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-[25px] right-[25px] top-[25px]" data-name="Container">
      <Container40 />
      <Container41 />
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[25px] right-[25px] top-[53px]" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-white w-[26.7px]">
        <p className="leading-[32px]">12</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[25px] right-[25px] top-[89px]" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-400 w-[95.75px]">
        <p className="leading-[20px]">8 Long, 4 Short</p>
      </div>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-gray-800 relative rounded-[8px] self-stretch shrink-0 w-[268px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-gray-700 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container42 />
      <Container43 />
      <Container44 />
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-400 w-[57.58px]">
        <p className="leading-[20px]">Win Rate</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_6_Free:Black',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-yellow-400 w-[18px]">
        <p className="leading-[16px]"></p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-[25px] right-[25px] top-[25px]" data-name="Container">
      <Container45 />
      <Container46 />
    </div>
  );
}

function Container48() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[25px] right-[25px] top-[53px]" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-white w-[68.06px]">
        <p className="leading-[32px]">68.5%</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[25px] right-[25px] top-[89px]" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-400 w-[79.39px]">
        <p className="leading-[20px]">Last 30 days</p>
      </div>
    </div>
  );
}

function BackgroundBorder3() {
  return (
    <div className="bg-gray-800 relative rounded-[8px] self-stretch shrink-0 w-[268px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-gray-700 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container47 />
      <Container48 />
      <Container49 />
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex gap-[16px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <BackgroundBorder />
      <BackgroundBorder1 />
      <BackgroundBorder2 />
      <BackgroundBorder3 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-gray-100 w-[166.69px]">
        <p className="leading-[28px]">AAPL - Apple Inc.</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-green-400 w-[86.77px]">
        <p className="leading-[32px]">$185.42</p>
      </div>
    </div>
  );
}

function Margin22() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[16px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-green-400 w-[110.3px]">
        <p className="leading-[24px]">+2.34 (+1.28%)</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Container51 />
      <Margin22 />
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Container">
      <Heading1 />
      <Container52 />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-gray-700 box-border content-stretch flex flex-col items-center justify-center px-[12px] py-[4px] relative rounded-[4px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-gray-100 w-[17.91px]">
        <p className="leading-[20px]">1D</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-blue-600 box-border content-stretch flex flex-col items-center justify-center px-[12px] py-[4px] relative rounded-[4px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-gray-100 w-[21px]">
        <p className="leading-[20px]">1W</p>
      </div>
    </div>
  );
}

function ButtonMargin1() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[8px] pr-0 py-0 relative shrink-0" data-name="Button:margin">
      <Button3 />
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-gray-700 box-border content-stretch flex flex-col items-center justify-center px-[12px] py-[4px] relative rounded-[4px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-gray-100 w-[19.45px]">
        <p className="leading-[20px]">1M</p>
      </div>
    </div>
  );
}

function ButtonMargin2() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[8px] pr-0 py-0 relative shrink-0" data-name="Button:margin">
      <Button4 />
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-gray-700 box-border content-stretch flex flex-col items-center justify-center px-[12px] py-[4px] relative rounded-[4px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-gray-100 w-[17.13px]">
        <p className="leading-[20px]">1Y</p>
      </div>
    </div>
  );
}

function ButtonMargin3() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[8px] pr-0 py-0 relative shrink-0" data-name="Button:margin">
      <Button5 />
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <Button2 />
      <ButtonMargin1 />
      <ButtonMargin2 />
      <ButtonMargin3 />
    </div>
  );
}

function Container55() {
  return (
    <div className="relative shrink-0 w-[688.66px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-between pl-0 pr-[0.01px] py-0 relative w-[688.66px]">
        <Container53 />
        <Container54 />
      </div>
    </div>
  );
}

function Image() {
  return (
    <div className="h-[320px] relative shrink-0 w-[688.69px]" data-name="image">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage} />
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="h-[320px] relative shrink-0 w-[688.66px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[320px] items-start overflow-clip relative rounded-[inherit] w-[688.66px]">
        <Image />
      </div>
    </div>
  );
}

function BackgroundBorder4() {
  return (
    <div className="bg-gray-800 box-border content-stretch flex flex-col gap-[16px] items-start p-[25px] relative rounded-[8px] self-stretch shrink-0 w-[738.66px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-gray-700 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container55 />
      <Container56 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="relative shrink-0 w-[307.34px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative w-[307.34px]">
        <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-gray-100 w-[101.06px]">
          <p className="leading-[28px]">Place Order</p>
        </div>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-green-600 box-border content-stretch flex flex-col items-center justify-center px-0 py-[8px] relative rounded-[4px] shrink-0 w-[149.67px]" data-name="Button">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-gray-100 w-[27.58px]">
        <p className="leading-[24px]">Buy</p>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-gray-700 box-border content-stretch flex flex-col items-center justify-center px-0 py-[8px] relative rounded-[4px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-gray-100 w-[26.69px]">
        <p className="leading-[24px]">Sell</p>
      </div>
    </div>
  );
}

function ButtonMargin4() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[8px] pr-0 py-0 relative shrink-0 w-[157.67px]" data-name="Button:margin">
      <Button7 />
    </div>
  );
}

function Container57() {
  return (
    <div className="relative shrink-0 w-[307.34px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-start justify-center relative w-[307.34px]">
        <Button6 />
        <ButtonMargin4 />
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-400 w-[69.78px]">
        <p className="leading-[20px]">Order Type</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="relative shrink-0 w-[253.34px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start overflow-clip px-0 py-px relative rounded-[inherit] w-[253.34px]">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white w-[94.25px]">
          <p className="leading-[17px]">Market Order</p>
        </div>
      </div>
    </div>
  );
}

function Options() {
  return (
    <div className="bg-gray-700 relative rounded-[4px] shrink-0 w-full" data-name="Options">
      <div aria-hidden="true" className="absolute border border-gray-600 border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex items-center justify-center pl-[21px] pr-[33px] py-[9px] relative w-full">
          <Container58 />
        </div>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Label />
      <Options />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-400 w-[52.14px]">
        <p className="leading-[20px]">Quantity</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white w-[17.8px]">
        <p className="leading-[24px]">10</p>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[258.34px]" data-name="Container">
      <Container60 />
    </div>
  );
}

function Container62() {
  return (
    <div className="relative shrink-0 w-[273.34px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative w-[273.34px]">
        <Container61 />
        <div className="flex flex-row items-center self-stretch">
          <div className="h-full min-w-[15px] opacity-0 shrink-0 w-[15px]" data-name="Rectangle" />
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-gray-700 relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex items-start justify-center px-[17px] py-[9px] relative w-full">
          <Container62 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-gray-600 border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Label1 />
      <Input />
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-400 w-[31.91px]">
        <p className="leading-[20px]">Price</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white w-[48.94px]">
        <p className="leading-[24px]">185.42</p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[258.34px]" data-name="Container">
      <Container64 />
    </div>
  );
}

function Container66() {
  return (
    <div className="relative shrink-0 w-[273.34px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center relative w-[273.34px]">
        <Container65 />
        <div className="flex flex-row items-center self-stretch">
          <div className="h-full min-w-[15px] opacity-0 shrink-0 w-[15px]" data-name="Rectangle" />
        </div>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-gray-700 relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex items-start justify-center px-[17px] py-[9px] relative w-full">
          <Container66 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-gray-600 border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Label2 />
      <Input1 />
    </div>
  );
}

function Container68() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-400 w-[94.94px]">
        <p className="leading-[20px]">Estimated Cost</p>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-100 w-[62.3px]">
        <p className="leading-[20px]">$1,854.20</p>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container68 />
      <Container69 />
    </div>
  );
}

function Container71() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-400 w-[77.02px]">
        <p className="leading-[20px]">Commission</p>
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-100 w-[35.05px]">
        <p className="leading-[20px]">$0.00</p>
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container71 />
      <Container72 />
    </div>
  );
}

function Background() {
  return (
    <div className="bg-gray-700 relative rounded-[4px] shrink-0 w-full" data-name="Background">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[4px] items-start p-[12px] relative w-full">
          <Container70 />
          <Container73 />
        </div>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-green-600 box-border content-stretch flex items-center justify-center px-0 py-[12px] relative rounded-[4px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-gray-100 w-[124.5px]">
        <p className="leading-[24px]">Place Buy Order</p>
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="relative shrink-0 w-[307.34px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] items-start relative w-[307.34px]">
        <Container59 />
        <Container63 />
        <Container67 />
        <Background />
        <Button8 />
      </div>
    </div>
  );
}

function BackgroundBorder5() {
  return (
    <div className="bg-gray-800 box-border content-stretch flex flex-col gap-[16px] items-start p-[25px] relative rounded-[8px] self-stretch shrink-0 w-[357.34px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-gray-700 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Heading2 />
      <Container57 />
      <Container74 />
    </div>
  );
}

function Container75() {
  return (
    <div className="content-stretch flex gap-[24px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <BackgroundBorder4 />
      <BackgroundBorder5 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 3">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-gray-100 w-[79.34px]">
        <p className="leading-[28px]">Watchlist</p>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_6_Free:Black',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-blue-400 text-center w-[14px]">
        <p className="leading-[16px]">+</p>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <Container76 />
    </div>
  );
}

function Container77() {
  return (
    <div className="relative shrink-0 w-[498px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-between relative w-[498px]">
        <Heading3 />
        <Button9 />
      </div>
    </div>
  );
}

function Container78() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-gray-100 w-[40.02px]">
        <p className="leading-[24px]">TSLA</p>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-400 w-[50.7px]">
        <p className="leading-[16px]">Tesla Inc.</p>
      </div>
    </div>
  );
}

function Container80() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container78 />
      <Container79 />
    </div>
  );
}

function Container81() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-green-400 text-right w-[57.84px]">
        <p className="leading-[24px]">$248.56</p>
      </div>
    </div>
  );
}

function Container82() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-green-400 text-right w-[41.05px]">
        <p className="leading-[16px]">+3.45%</p>
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container81 />
      <Container82 />
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-gray-700 relative rounded-[4px] shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between p-[12px] relative w-full">
          <Container80 />
          <Container83 />
        </div>
      </div>
    </div>
  );
}

function Container84() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-gray-100 w-[43.55px]">
        <p className="leading-[24px]">MSFT</p>
      </div>
    </div>
  );
}

function Container85() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-400 w-[81.36px]">
        <p className="leading-[16px]">Microsoft Corp.</p>
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container84 />
      <Container85 />
    </div>
  );
}

function Container87() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-green-400 text-right w-[57.84px]">
        <p className="leading-[24px]">$378.92</p>
      </div>
    </div>
  );
}

function Container88() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-green-400 text-right w-[41.05px]">
        <p className="leading-[16px]">+1.23%</p>
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container87 />
      <Container88 />
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-gray-700 relative rounded-[4px] shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between p-[12px] relative w-full">
          <Container86 />
          <Container89 />
        </div>
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-gray-100 w-[58.69px]">
        <p className="leading-[24px]">GOOGL</p>
      </div>
    </div>
  );
}

function Container91() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-400 w-[70.06px]">
        <p className="leading-[16px]">Alphabet Inc.</p>
      </div>
    </div>
  );
}

function Container92() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container90 />
      <Container91 />
    </div>
  );
}

function Container93() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-red-400 text-right w-[57.84px]">
        <p className="leading-[24px]">$142.34</p>
      </div>
    </div>
  );
}

function Container94() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-red-400 text-right w-[38.03px]">
        <p className="leading-[16px]">-0.87%</p>
      </div>
    </div>
  );
}

function Container95() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container93 />
      <Container94 />
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-gray-700 relative rounded-[4px] shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between p-[12px] relative w-full">
          <Container92 />
          <Container95 />
        </div>
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-gray-100 w-[45.33px]">
        <p className="leading-[24px]">AMZN</p>
      </div>
    </div>
  );
}

function Container97() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-400 w-[92.7px]">
        <p className="leading-[16px]">Amazon.com Inc.</p>
      </div>
    </div>
  );
}

function Container98() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container96 />
      <Container97 />
    </div>
  );
}

function Container99() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-green-400 text-right w-[57.84px]">
        <p className="leading-[24px]">$156.78</p>
      </div>
    </div>
  );
}

function Container100() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-green-400 text-right w-[41.05px]">
        <p className="leading-[16px]">+2.15%</p>
      </div>
    </div>
  );
}

function Container101() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container99 />
      <Container100 />
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-gray-700 relative rounded-[4px] shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between p-[12px] relative w-full">
          <Container98 />
          <Container101 />
        </div>
      </div>
    </div>
  );
}

function Container102() {
  return (
    <div className="relative shrink-0 w-[498px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] items-start relative w-[498px]">
        <Background1 />
        <Background2 />
        <Background3 />
        <Background4 />
      </div>
    </div>
  );
}

function BackgroundBorder6() {
  return (
    <div className="bg-gray-800 box-border content-stretch flex flex-col gap-[16px] items-start p-[25px] relative rounded-[8px] self-stretch shrink-0 w-[548px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-gray-700 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container77 />
      <Container102 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="relative shrink-0 w-[498px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative w-[498px]">
        <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-gray-100 w-[151.02px]">
          <p className="leading-[28px]">Current Positions</p>
        </div>
      </div>
    </div>
  );
}

function Container103() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-gray-100 w-[40.92px]">
        <p className="leading-[24px]">AAPL</p>
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-400 w-[114.94px]">
        <p className="leading-[16px]">50 shares @ $180.00</p>
      </div>
    </div>
  );
}

function Container105() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container103 />
      <Container104 />
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-green-600 box-border content-stretch flex flex-col items-start px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-100 w-[34.02px]">
        <p className="leading-[16px]">LONG</p>
      </div>
    </div>
  );
}

function Container106() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container105 />
      <Background5 />
    </div>
  );
}

function Container107() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-400 w-[105.08px]">
        <p className="leading-[20px]">Current: $185.42</p>
      </div>
    </div>
  );
}

function Container108() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-green-400 w-[119.88px]">
        <p className="leading-[20px]">+$271.00 (+3.01%)</p>
      </div>
    </div>
  );
}

function Container109() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container107 />
      <Container108 />
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-gray-700 relative rounded-[4px] shrink-0 w-full" data-name="Background">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[12px] relative w-full">
          <Container106 />
          <Container109 />
        </div>
      </div>
    </div>
  );
}

function Container110() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-gray-100 w-[44.45px]">
        <p className="leading-[24px]">NVDA</p>
      </div>
    </div>
  );
}

function Container111() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-400 w-[114.94px]">
        <p className="leading-[16px]">25 shares @ $495.00</p>
      </div>
    </div>
  );
}

function Container112() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container110 />
      <Container111 />
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-green-600 box-border content-stretch flex flex-col items-start px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-100 w-[34.02px]">
        <p className="leading-[16px]">LONG</p>
      </div>
    </div>
  );
}

function Container113() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container112 />
      <Background7 />
    </div>
  );
}

function Container114() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-400 w-[105.08px]">
        <p className="leading-[20px]">Current: $512.34</p>
      </div>
    </div>
  );
}

function Container115() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-green-400 w-[119.88px]">
        <p className="leading-[20px]">+$433.50 (+3.50%)</p>
      </div>
    </div>
  );
}

function Container116() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container114 />
      <Container115 />
    </div>
  );
}

function Background8() {
  return (
    <div className="bg-gray-700 relative rounded-[4px] shrink-0 w-full" data-name="Background">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[12px] relative w-full">
          <Container113 />
          <Container116 />
        </div>
      </div>
    </div>
  );
}

function Container117() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-gray-100 w-[43.27px]">
        <p className="leading-[24px]">META</p>
      </div>
    </div>
  );
}

function Container118() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-400 w-[114.94px]">
        <p className="leading-[16px]">30 shares @ $355.00</p>
      </div>
    </div>
  );
}

function Container119() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container117 />
      <Container118 />
    </div>
  );
}

function Background9() {
  return (
    <div className="bg-green-600 box-border content-stretch flex flex-col items-start px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-100 w-[34.02px]">
        <p className="leading-[16px]">LONG</p>
      </div>
    </div>
  );
}

function Container120() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container119 />
      <Background9 />
    </div>
  );
}

function Container121() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-400 w-[105.08px]">
        <p className="leading-[20px]">Current: $348.90</p>
      </div>
    </div>
  );
}

function Container122() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-red-400 w-[112.84px]">
        <p className="leading-[20px]">-$183.00 (-1.72%)</p>
      </div>
    </div>
  );
}

function Container123() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container121 />
      <Container122 />
    </div>
  );
}

function Background10() {
  return (
    <div className="bg-gray-700 relative rounded-[4px] shrink-0 w-full" data-name="Background">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[12px] relative w-full">
          <Container120 />
          <Container123 />
        </div>
      </div>
    </div>
  );
}

function Container124() {
  return (
    <div className="relative shrink-0 w-[498px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] items-start relative w-[498px]">
        <Background6 />
        <Background8 />
        <Background10 />
      </div>
    </div>
  );
}

function BackgroundBorder7() {
  return (
    <div className="bg-gray-800 box-border content-stretch flex flex-col gap-[16px] items-start p-[25px] relative rounded-[8px] self-stretch shrink-0 w-[548px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-gray-700 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Heading4 />
      <Container124 />
    </div>
  );
}

function Container125() {
  return (
    <div className="content-stretch flex gap-[24px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <BackgroundBorder6 />
      <BackgroundBorder7 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="relative shrink-0 w-[1070px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative w-[1070px]">
        <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-gray-100 w-[176.06px]">
          <p className="leading-[28px]">Recent Transactions</p>
        </div>
      </div>
    </div>
  );
}

function Cell() {
  return (
    <div className="relative shrink-0 w-[284.69px]" data-name="Cell">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start px-px py-[12px] relative w-[284.69px]">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-400 w-[29.58px]">
          <p className="leading-[20px]">Date</p>
        </div>
      </div>
    </div>
  );
}

function Cell1() {
  return (
    <div className="relative shrink-0 w-[123.16px]" data-name="Cell">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start px-px py-[12px] relative w-[123.16px]">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-400 w-[46.69px]">
          <p className="leading-[20px]">Symbol</p>
        </div>
      </div>
    </div>
  );
}

function Cell2() {
  return (
    <div className="relative shrink-0 w-[91.69px]" data-name="Cell">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start px-px py-[12px] relative w-[91.69px]">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-400 w-[30.36px]">
          <p className="leading-[20px]">Type</p>
        </div>
      </div>
    </div>
  );
}

function Cell3() {
  return (
    <div className="relative shrink-0 w-[136.94px]" data-name="Cell">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-end px-px py-[12px] relative w-[136.94px]">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-400 text-right w-[52.14px]">
          <p className="leading-[20px]">Quantity</p>
        </div>
      </div>
    </div>
  );
}

function Cell4() {
  return (
    <div className="relative shrink-0 w-[133.06px]" data-name="Cell">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-end px-px py-[12px] relative w-[133.06px]">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-400 text-right w-[31.91px]">
          <p className="leading-[20px]">Price</p>
        </div>
      </div>
    </div>
  );
}

function Cell5() {
  return (
    <div className="relative shrink-0 w-[182.31px]" data-name="Cell">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-end px-px py-[12px] relative w-[182.31px]">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-400 text-right w-[29.58px]">
          <p className="leading-[20px]">Total</p>
        </div>
      </div>
    </div>
  );
}

function Cell6() {
  return (
    <div className="relative shrink-0 w-[118.16px]" data-name="Cell">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-end px-px py-[12px] relative w-[118.16px]">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-400 text-right w-[39.7px]">
          <p className="leading-[20px]">Status</p>
        </div>
      </div>
    </div>
  );
}

function HeaderRow() {
  return (
    <div className="box-border content-stretch flex items-start justify-center mb-[-1px] pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Header → Row">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-700 border-solid inset-0 pointer-events-none" />
      <Cell />
      <Cell1 />
      <Cell2 />
      <Cell3 />
      <Cell4 />
      <Cell5 />
      <Cell6 />
    </div>
  );
}

function Data() {
  return (
    <div className="relative shrink-0 w-[284.69px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start px-px py-[12.5px] relative w-[284.69px]">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-100 w-[110.55px]">
          <p className="leading-[20px]">2024-01-15 10:23</p>
        </div>
      </div>
    </div>
  );
}

function Data1() {
  return (
    <div className="relative shrink-0 w-[123.16px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start px-px py-[12.5px] relative w-[123.16px]">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-100 w-[35.81px]">
          <p className="leading-[20px]">AAPL</p>
        </div>
      </div>
    </div>
  );
}

function Data2() {
  return (
    <div className="relative shrink-0 w-[91.69px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start px-px py-[12.5px] relative w-[91.69px]">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-green-400 w-[28.8px]">
          <p className="leading-[20px]">BUY</p>
        </div>
      </div>
    </div>
  );
}

function Data3() {
  return (
    <div className="relative shrink-0 w-[136.94px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-end px-px py-[12.5px] relative w-[136.94px]">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-100 text-right w-[15.58px]">
          <p className="leading-[20px]">50</p>
        </div>
      </div>
    </div>
  );
}

function Data4() {
  return (
    <div className="relative shrink-0 w-[133.06px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-end px-px py-[12.5px] relative w-[133.06px]">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-100 text-right w-[50.61px]">
          <p className="leading-[20px]">$180.00</p>
        </div>
      </div>
    </div>
  );
}

function Data5() {
  return (
    <div className="relative shrink-0 w-[182.31px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-end px-px py-[12.5px] relative w-[182.31px]">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-100 text-right w-[62.3px]">
          <p className="leading-[20px]">$9,000.00</p>
        </div>
      </div>
    </div>
  );
}

function Background11() {
  return (
    <div className="bg-green-600 box-border content-stretch flex items-start justify-end px-[8px] py-[3px] relative rounded-[4px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-100 text-right w-[28.69px]">
        <p className="leading-[16px]">Filled</p>
      </div>
    </div>
  );
}

function Data6() {
  return (
    <div className="relative shrink-0 w-[118.16px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-end px-px py-[11.5px] relative w-[118.16px]">
        <Background11 />
      </div>
    </div>
  );
}

function Row() {
  return (
    <div className="box-border content-stretch flex items-start justify-center mb-[-1px] pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-700 border-solid inset-0 pointer-events-none" />
      <Data />
      <Data1 />
      <Data2 />
      <Data3 />
      <Data4 />
      <Data5 />
      <Data6 />
    </div>
  );
}

function Data7() {
  return (
    <div className="relative shrink-0 w-[284.69px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start px-px py-[12.5px] relative w-[284.69px]">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-100 w-[110.55px]">
          <p className="leading-[20px]">2024-01-15 09:45</p>
        </div>
      </div>
    </div>
  );
}

function Data8() {
  return (
    <div className="relative shrink-0 w-[123.16px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start px-px py-[12.5px] relative w-[123.16px]">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-100 w-[35.02px]">
          <p className="leading-[20px]">TSLA</p>
        </div>
      </div>
    </div>
  );
}

function Data9() {
  return (
    <div className="relative shrink-0 w-[91.69px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start px-px py-[12.5px] relative w-[91.69px]">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-red-400 w-[34.25px]">
          <p className="leading-[20px]">SELL</p>
        </div>
      </div>
    </div>
  );
}

function Data10() {
  return (
    <div className="relative shrink-0 w-[136.94px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-end px-px py-[12.5px] relative w-[136.94px]">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-100 text-right w-[15.58px]">
          <p className="leading-[20px]">20</p>
        </div>
      </div>
    </div>
  );
}

function Data11() {
  return (
    <div className="relative shrink-0 w-[133.06px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-end px-px py-[12.5px] relative w-[133.06px]">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-100 text-right w-[50.61px]">
          <p className="leading-[20px]">$245.00</p>
        </div>
      </div>
    </div>
  );
}

function Data12() {
  return (
    <div className="relative shrink-0 w-[182.31px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-end px-px py-[12.5px] relative w-[182.31px]">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-100 text-right w-[62.3px]">
          <p className="leading-[20px]">$4,900.00</p>
        </div>
      </div>
    </div>
  );
}

function Background12() {
  return (
    <div className="bg-green-600 box-border content-stretch flex items-start justify-end px-[8px] py-[3px] relative rounded-[4px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-100 text-right w-[28.69px]">
        <p className="leading-[16px]">Filled</p>
      </div>
    </div>
  );
}

function Data13() {
  return (
    <div className="relative shrink-0 w-[118.16px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-end px-px py-[11.5px] relative w-[118.16px]">
        <Background12 />
      </div>
    </div>
  );
}

function Row1() {
  return (
    <div className="box-border content-stretch flex items-start justify-center mb-[-1px] pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-700 border-solid inset-0 pointer-events-none" />
      <Data7 />
      <Data8 />
      <Data9 />
      <Data10 />
      <Data11 />
      <Data12 />
      <Data13 />
    </div>
  );
}

function Data14() {
  return (
    <div className="relative shrink-0 w-[284.69px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start px-px py-[12.5px] relative w-[284.69px]">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-100 w-[110.55px]">
          <p className="leading-[20px]">2024-01-14 15:30</p>
        </div>
      </div>
    </div>
  );
}

function Data15() {
  return (
    <div className="relative shrink-0 w-[123.16px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start px-px py-[12.5px] relative w-[123.16px]">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-100 w-[38.91px]">
          <p className="leading-[20px]">NVDA</p>
        </div>
      </div>
    </div>
  );
}

function Data16() {
  return (
    <div className="relative shrink-0 w-[91.69px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start px-px py-[12.5px] relative w-[91.69px]">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-green-400 w-[28.8px]">
          <p className="leading-[20px]">BUY</p>
        </div>
      </div>
    </div>
  );
}

function Data17() {
  return (
    <div className="relative shrink-0 w-[136.94px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-end px-px py-[12.5px] relative w-[136.94px]">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-100 text-right w-[15.58px]">
          <p className="leading-[20px]">25</p>
        </div>
      </div>
    </div>
  );
}

function Data18() {
  return (
    <div className="relative shrink-0 w-[133.06px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-end px-px py-[12.5px] relative w-[133.06px]">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-100 text-right w-[50.61px]">
          <p className="leading-[20px]">$495.00</p>
        </div>
      </div>
    </div>
  );
}

function Data19() {
  return (
    <div className="relative shrink-0 w-[182.31px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-end px-px py-[12.5px] relative w-[182.31px]">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-100 text-right w-[70.08px]">
          <p className="leading-[20px]">$12,375.00</p>
        </div>
      </div>
    </div>
  );
}

function Background13() {
  return (
    <div className="bg-green-600 box-border content-stretch flex items-start justify-end px-[8px] py-[3px] relative rounded-[4px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-100 text-right w-[28.69px]">
        <p className="leading-[16px]">Filled</p>
      </div>
    </div>
  );
}

function Data20() {
  return (
    <div className="relative shrink-0 w-[118.16px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-end px-px py-[11.5px] relative w-[118.16px]">
        <Background13 />
      </div>
    </div>
  );
}

function Row2() {
  return (
    <div className="box-border content-stretch flex items-start justify-center mb-[-1px] pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-700 border-solid inset-0 pointer-events-none" />
      <Data14 />
      <Data15 />
      <Data16 />
      <Data17 />
      <Data18 />
      <Data19 />
      <Data20 />
    </div>
  );
}

function Body() {
  return (
    <div className="box-border content-stretch flex flex-col items-start mb-[-1px] pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Body">
      <Row />
      <Row1 />
      <Row2 />
    </div>
  );
}

function Table() {
  return (
    <div className="relative shrink-0 w-[1070px]" data-name="Table">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start overflow-clip pb-px pt-0 px-0 relative rounded-[inherit] w-[1070px]">
        <HeaderRow />
        <Body />
      </div>
    </div>
  );
}

function BackgroundBorder8() {
  return (
    <div className="bg-gray-800 relative rounded-[8px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-gray-700 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[25px] relative w-full">
          <Heading5 />
          <Table />
        </div>
      </div>
    </div>
  );
}

function Container126() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-[32px] relative w-full">
          <Container50 />
          <Container75 />
          <Container125 />
          <BackgroundBorder8 />
        </div>
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="bg-gray-900 content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[1184px]" data-name="Main">
      <BackgroundHorizontalBorder />
      <BackgroundHorizontalBorder1 />
      <Container126 />
    </div>
  );
}

function Container127() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <Aside />
      <Main />
    </div>
  );
}

export default function Body1() {
  return (
    <div className="bg-gray-900 content-stretch flex flex-col items-start relative size-full" data-name="Body">
      <Container127 />
    </div>
  );
}