// Root app — composes the homepage
function App() {
  return (
    <>
      <UtilityBar />
      <Nav />
      <main>
        <Hero />
        <MarqueeStrip />
        <Categories />
        <HowItWorks />
        <BeforeAfterSlider />
        <Bestsellers />
        <QuickTextBand />
        <PricingBand />
        <section id="gallery">
          <Gallery />
        </section>
        <CustomerReviewWall />
        <TrustStrip />
        <BrandLogoStrip visible={true} />
        <FinalCTA />
        <InstagramBlock />
      </main>
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
