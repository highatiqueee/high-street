
import HeroSlideshow from "./components/HeroSlideshow";
import AuthModal from "./components/AuthModal";
const features = [
  {
    number: "01",
    title: "Community-Driven Culture",
  },
  {
    number: "02",
    title: "Future-Ready Fashion",
  },
  {
    number: "03",
    title: "Art Meets Attitude",
  },
  {
    number: "04",
    title: "Built for the Streets",
  },
];

const products = [
  {
    id: 1,
    name: "High Street Black Oversized Tee",
    price: 999,
    category: "ESSENTIALS",
    image: "/oversized-black-tee.jpeg",
    badge: "NEW DROP",
  },
  {
    id: 2,
    name: "High Street Graphic Tee",
    price: 1199,
    category: "GRAPHIC COLLECTION",
    image: "/oversized-black-tee.jpeg",
    badge: "STREET CULTURE",
  },
  {
    id: 3,
    name: "High Street Limited Edition",
    price: 1299,
    category: "LIMITED COLLECTION",
    image: "/oversized-black-tee.jpeg",
    badge: "LIMITED DROP",
  },
];
export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a href="#" className="brand-logo" aria-label="High Street home">
          HIGH STREET<span>®</span>
        </a>

        <nav className="main-nav" aria-label="Main navigation">
          <a href="#">Home</a>
          <a href="#shop">Shop</a>
          <a href="#about">About Us</a>
          <a href="#collection">Collection</a>
          <a href="#categories">Category</a>
        </nav>

        <div className="header-actions">
          <a href="#shop" className="icon-link" aria-label="Shopping bag">
            <svg
              width="23"
              height="23"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M5 8h14l1 13H4L5 8Z" />
              <path d="M9 8a3 3 0 0 1 6 0" />
            </svg>
            <span className="cart-count">0</span>
          </a>

          <AuthModal />
        </div>
      </header>

      <HeroSlideshow />

      <section className="intro-section" id="about">
        <div className="intro-label">
          <span>01 / THE MANIFESTO</span>
          <span>MADE FOR THE UNORDINARY</span>
        </div>

        <h2>
          YOUR STYLE.
          <br />
          <span>YOUR RULES.</span>
        </h2>

        <div className="intro-bottom">
          <p>
            HIGH STREET is more than clothing. It's a statement.
            Designed for the unapologetic, made for the ones who
            refuse to blend in.
          </p>

          <a href="#shop" className="text-link">
            DISCOVER OUR WORLD ↗
          </a>
        </div>
      </section>

      <section className="shop-section" id="shop">
        <div className="section-heading">
          <div>
            <p className="eyebrow dark-eyebrow">THE STREET EDIT / 001</p>
            <h2>THE LATEST DROP.</h2>
          </div>

          <a href="#categories" className="text-link">
            EXPLORE ALL ↗
          </a>
        </div>

        <div className="product-grid">
          {products.map((product, index) => (
            <article className="product-card" key={product.name}>
              <a
                href="#newsletter"
                className="product-image-wrap"
                aria-label={`Discover ${product.name}`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />

                <span className="product-number">
                  0{index + 1}
                </span>

                <span className="product-quick-view">
                  DISCOVER ↗
                </span>
              </a>

              <div className="product-info">
                <div>
                  <p className="product-category">{product.category}</p>
                  <h3>{product.name}</h3>
                </div>

                <span className="product-price">{product.price}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="newsletter-section" id="newsletter">
        <p className="eyebrow">DON'T MISS THE NEXT DROP</p>

        <h2>
          STAY IN THE
          <br />
          <span>INNER CIRCLE.</span>
        </h2>

        <p>
          New collections. Limited releases. No unnecessary noise.
        </p>

        <div className="contact-buttons">
  <a
    href="mailto:
hightstreet0931@gmail.com?subject=High%20Street%20Customer%20Inquiry"
    className="newsletter-button"
  >
    ✉ EMAIL US ↗
  </a>

  <a
    href="https://wa.me/918828649826?text=Hi%20HIGH%20STREET!%20I%20would%20like%20to%20know%20more%20about%20your%20collection."
    className="newsletter-button whatsapp-button"
    target="_blank"
    rel="noopener noreferrer"
  >
    ☏ WHATSAPP US ↗
  </a>
</div>
      </section>

      <footer className="site-footer" id="categories">
        <a href="#" className="footer-logo">
          HIGH STREET<span>®</span>
        </a>

        <p>OWN YOUR STREET. OWN YOUR STORY.</p>

        <span>© 2026 HIGH STREET. ALL RIGHTS RESERVED.</span>
      </footer>
    </main>
  );
}