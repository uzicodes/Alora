import Image from "next/image";

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff', color: '#111', fontFamily: 'var(--font-body)' }}>

      {/* Intro Section */}
      <section style={{ paddingTop: 20, paddingBottom: 80, textAlign: 'center', paddingLeft: 24, paddingRight: 24 }}>
        <p style={{
          fontSize: 14, fontWeight: 500, letterSpacing: 4, textTransform: 'uppercase',
          color: '#ca3131ff', marginBottom: 20
        }}>
          Our Story
        </p>
        <h1 style={{
          fontFamily: 'var(--font-david-libre)', fontSize: 'clamp(36px, 5vw, 60px)',
          fontWeight: 300, letterSpacing: 6, textTransform: 'uppercase', marginBottom: 10
        }}>
          About Alora
        </h1>
        <div style={{ width: 250, height: 2, background: '#C28D10', margin: '0 auto 20px' }}></div>
        <p style={{
          maxWidth: 680, margin: '0 auto', fontSize: 15, lineHeight: 1.8,
          color: '#666', fontWeight: 300
        }}>
          Founded on the belief that fragrance is an extension of identity,
          Alora combines centuries-old artisanal techniques with contemporary design.
          Every bottle is a masterpiece — from the hand-selected raw materials sourced
          across five continents, to the meticulous blending process that can take
          up to three years to perfect.
        </p>
      </section>

      {/* Values Section */}
      <section style={{ background: '#ffffff', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '-50px auto' }}>
          <p style={{
            fontSize: 10, fontWeight: 500, letterSpacing: 4, textTransform: 'uppercase',
            color: '#ca3131ff', marginBottom: 16, textAlign: 'center'
          }}>
            What We Stand For
          </p>
          <h2 style={{
            fontFamily: 'var(--font-david-libre)', fontSize: 'clamp(28px, 3.5vw, 42px)',
            fontWeight: 300, letterSpacing: 4, textTransform: 'uppercase',
            textAlign: 'center', marginBottom: 60
          }}>
            Our Values
          </h2>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 40
          }}>
            {/* Value 1 */}
            <div style={{ textAlign: 'center', padding: '40px 28px', border: '1px solid #eee', transition: 'border-color 0.3s' }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%', background: '#111', color: '#C28D10',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px', fontSize: 22
              }}>
                ✦
              </div>
              <h3 style={{
                fontFamily: 'var(--font-david-libre)', fontSize: 18, fontWeight: 400,
                letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12
              }}>
                Authenticity
              </h3>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: '#777', fontWeight: 300 }}>
                Every fragrance we offer is 100% authentic, sourced directly from the world&apos;s most prestigious perfume houses. No compromises. No imitations.
              </p>
            </div>

            {/* Value 2 */}
            <div style={{ textAlign: 'center', padding: '40px 28px', border: '1px solid #eee' }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%', background: '#111', color: '#C28D10',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px', fontSize: 22
              }}>
                ◆
              </div>
              <h3 style={{
                fontFamily: 'var(--font-david-libre)', fontSize: 18, fontWeight: 400,
                letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12
              }}>
                Craftsmanship
              </h3>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: '#777', fontWeight: 300 }}>
                We celebrate the art of perfumery — from rare ingredients harvested at peak potency to master blenders who spend years perfecting each composition.
              </p>
            </div>

            {/* Value 3 */}
            <div style={{ textAlign: 'center', padding: '40px 28px', border: '1px solid #eee' }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%', background: '#111', color: '#C28D10',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px', fontSize: 22
              }}>
                ★
              </div>
              <h3 style={{
                fontFamily: 'var(--font-david-libre)', fontSize: 18, fontWeight: 400,
                letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12
              }}>
                Experience
              </h3>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: '#777', fontWeight: 300 }}>
                We believe luxury should be felt, not just seen. Each Alora scent is designed to evolve with you, revealing new layers and leaving an unforgettable impression.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Promise Section */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 60, alignItems: 'center' }}>
          <div>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5', background: '#f5f5f5' }}>
              <Image
                src="/alora_BG2.png"
                alt="Alora luxury craftsmanship"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          <div>
            <p style={{
              fontSize: 11, fontWeight: 500, letterSpacing: 4, textTransform: 'uppercase',
              color: '#ca3131ff', marginBottom: 16
            }}>
              Our Promise
            </p>
            <h2 style={{
              fontFamily: 'var(--font-david-libre)', fontSize: 'clamp(26px, 3vw, 38px)',
              fontWeight: 300, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 24
            }}>
              Luxury Without Compromise
            </h2>
            <div style={{ width: 40, height: 1, background: '#C28D10', marginBottom: 28 }}></div>
            <p style={{ fontSize: 14, lineHeight: 1.9, color: '#666', fontWeight: 300, marginBottom: 20 }}>
              At Alora, we believe every individual deserves access to the world&apos;s finest fragrances.
              Our curated collection spans the most iconic perfume houses — from Dior and Chanel to
              niche artisans like Creed and Tom Ford.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.9, color: '#666', fontWeight: 300 }}>
              With complimentary gift wrapping, free shipping on orders over $150, and a dedicated
              concierge team, every Alora experience is designed to feel extraordinary.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ background: '#111', color: '#fff', padding: '10px 24px' }}>
        <div style={{
          maxWidth: 1000, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40,
          textAlign: 'center'
        }}>
          <div>
            <p style={{ fontFamily: 'var(--font-ubuntu )', fontSize: 42, fontWeight: 300, color: '#C28D10', marginBottom: 8 }}>200+</p>
            <p style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Fragrances</p>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-ubuntu)', fontSize: 42, fontWeight: 300, color: '#C28D10', marginBottom: 8 }}>50+</p>
            <p style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Premium Brands</p>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-ubuntu)', fontSize: 42, fontWeight: 300, color: '#C28D10', marginBottom: 8 }}>15K+</p>
            <p style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Happy Customers</p>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-ubuntu)', fontSize: 42, fontWeight: 300, color: '#C28D10', marginBottom: 8 }}>24/7</p>
            <p style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Concierge Support</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{
            fontSize: 11, fontWeight: 500, letterSpacing: 4, textTransform: 'uppercase',
            color: '#ca3131ff', marginBottom: 16, textAlign: 'center'
          }}>
            Get In Touch
          </p>
          <h2 style={{
            fontFamily: 'var(--font-david-libre)', fontSize: 'clamp(28px, 3.5vw, 42px)',
            fontWeight: 300, letterSpacing: 4, textTransform: 'uppercase',
            textAlign: 'center', marginBottom: 16
          }}>
            Contact Us
          </h2>
          <div style={{ width: 48, height: 1, background: '#C28D10', margin: '0 auto 48px' }}></div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 60
          }}>
            {/* Contact Info */}
            <div>
              <h3 style={{
                fontFamily: 'var(--font-david-libre)', fontSize: 20, fontWeight: 400,
                letterSpacing: 2, textTransform: 'uppercase', marginBottom: 28
              }}>
                Visit or Reach Out
              </h3>

              <div style={{ marginBottom: 28 }}>
                <p style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#ca3131ff', marginBottom: 8, textDecoration: 'underline' }}>Address</p>
                <p style={{ fontSize: 14, color: '#444', lineHeight: 1.7 }}>
                  123 Luxury Avenue, Suite 500<br />
                  Beverly Hills, CA 90210<br />
                  United States
                </p>
              </div>

              <div style={{ marginBottom: 28 }}>
                <p style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#ca3131ff', marginBottom: 8, textDecoration: 'underline' }}>Email</p>
                <p style={{ fontSize: 14, color: '#444' }}>hello@alora.com</p>
              </div>

              <div style={{ marginBottom: 28 }}>
                <p style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#ca3131ff', marginBottom: 8, textDecoration: 'underline' }}>Phone</p>
                <p style={{ fontSize: 14, color: '#444' }}>+1 (800) ALORA-LX</p>
              </div>

              <div>
                <p style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#ca3131ff', marginBottom: 8, textDecoration: 'underline' }}>Hours</p>
                <p style={{ fontSize: 14, color: '#444', lineHeight: 1.7 }}>
                  Monday – Friday: 9:00 AM – 7:00 PM<br />
                  Saturday: 10:00 AM – 5:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 style={{
                fontFamily: 'var(--font-david-libre)', fontSize: 20, fontWeight: 400,
                letterSpacing: 2, textTransform: 'uppercase', marginBottom: 28
              }}>
                Send a Message
              </h3>

              <form style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <input
                    type="text"
                    placeholder="First Name"
                    style={{
                      padding: '14px 16px', border: '1px solid #ddd', fontSize: 13,
                      letterSpacing: 1, outline: 'none', fontFamily: 'var(--font-body)',
                      transition: 'border-color 0.3s', background: '#fafafa'
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    style={{
                      padding: '14px 16px', border: '1px solid #ddd', fontSize: 13,
                      letterSpacing: 1, outline: 'none', fontFamily: 'var(--font-body)',
                      background: '#fafafa'
                    }}
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  style={{
                    padding: '14px 16px', border: '1px solid #ddd', fontSize: 13,
                    letterSpacing: 1, outline: 'none', fontFamily: 'var(--font-body)',
                    background: '#fafafa'
                  }}
                />
                <select
                  style={{
                    padding: '14px 16px', border: '1px solid #ddd', fontSize: 13,
                    letterSpacing: 1, outline: 'none', fontFamily: 'var(--font-body)',
                    background: '#fafafa', color: '#999'
                  }}
                >
                  <option value="">Subject</option>
                  <option value="order">Order Inquiry</option>
                  <option value="product">Product Question</option>
                  <option value="returns">Returns & Exchanges</option>
                  <option value="other">Other</option>
                </select>
                <textarea
                  placeholder="Your Message"
                  rows={5}
                  style={{
                    padding: '14px 16px', border: '1px solid #ddd', fontSize: 13,
                    letterSpacing: 1, outline: 'none', fontFamily: 'var(--font-body)',
                    resize: 'vertical', background: '#fafafa'
                  }}
                />
                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    border: 'none', fontSize: 11, letterSpacing: 3,
                    fontFamily: 'var(--font-body)',
                    alignSelf: 'flex-start'
                  }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
