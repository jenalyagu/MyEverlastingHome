import LegalPageLayout from './LegalPageLayout'

export default function PrivacyPolicy() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="July 9, 2026">
      <p>
        This Privacy Policy explains what information My Everlasting Home collects when you use the
        Platform, how it's used, and who it's shared with.
      </p>

      <section>
        <h2>1. Information You Provide</h2>
        <p>We collect information you enter directly, including:</p>
        <ul>
          <li>Quiz and intake responses (family size, lifestyle priorities, property details, aesthetic preferences, and similar design inputs)</li>
          <li>Contact details you submit when connecting with the EHBG team or reaching out via our Contact page (name, email, phone, and any message you include)</li>
        </ul>
        <p>We do not require an account, and we do not collect payment information.</p>
      </section>

      <section>
        <h2>2. How We Use It</h2>
        <ul>
          <li>To generate your personalized estate blueprint and concept board</li>
          <li>To follow up with you about your project if you request contact</li>
          <li>To respond to messages sent through the Contact page</li>
        </ul>
        <p>We do not sell your information.</p>
      </section>

      <section>
        <h2>3. Third-Party Services</h2>
        <p>We rely on the following third-party services to operate the Platform:</p>
        <ul>
          <li><strong>Formspree</strong> — processes form submissions (lead capture and contact messages) and delivers them to us by email</li>
          <li><strong>Netlify</strong> — hosts the Platform and its serverless functions</li>
        </ul>
        <p>
          Each of these providers processes data under their own privacy policies, in addition to this one.
        </p>
      </section>

      <section>
        <h2>4. Data Retention</h2>
        <p>
          Quiz responses used to generate your blueprint are processed to produce your results and are not
          stored in a database by the Platform itself. Information you submit through a contact or lead
          form is retained in our email inbox and the associated Formspree account for as long as
          reasonably needed to respond to you and maintain business records.
        </p>
      </section>

      <section>
        <h2>5. Your Choices</h2>
        <p>
          You can decline to submit contact information — the blueprint quiz and concept board work
          without it. If you've already submitted your details and want them removed, contact us using
          the <a href="/contact">Contact page</a> or email{' '}
          <a href="mailto:info@everlastinghomesgroup.com">info@everlastinghomesgroup.com</a> and
          we'll delete them from our records.
        </p>
      </section>

      <section>
        <h2>6. Children's Privacy</h2>
        <p>The Platform is intended for adults planning a home and is not directed at children.</p>
      </section>

      <section>
        <h2>7. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The "Last updated" date at the top of this
          page reflects the most recent revision.
        </p>
      </section>

      <section>
        <h2>8. Contact</h2>
        <p>
          Questions about this Privacy Policy can be sent through our <a href="/contact">Contact page</a>.
        </p>
      </section>
    </LegalPageLayout>
  )
}
