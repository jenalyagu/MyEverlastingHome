import LegalPageLayout from './LegalPageLayout'

export default function TermsOfService() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated="July 9, 2026">
      <p>
        These Terms of Service ("Terms") govern your use of My Everlasting Home (the "Platform"), an
        AI-assisted estate concept design tool provided in connection with EHBG. By using the Platform,
        you agree to these Terms.
      </p>

      <section>
        <h2>1. What the Platform Provides</h2>
        <p>
          My Everlasting Home generates conceptual estate blueprints, mood boards, and design narratives
          based on answers you provide through our quiz and intake forms. Output is generated with the
          assistance of AI models and deterministic design templates, and is intended for inspiration and
          early-stage planning purposes only.
        </p>
      </section>

      <section>
        <h2>2. Not Architectural, Engineering, or Construction Advice</h2>
        <p>
          Nothing produced by the Platform constitutes licensed architectural or engineering work, a
          construction document, a permit-ready plan, or professional advice of any kind. Any estate,
          room layout, material, or structural claim (including references to SCIP construction) is
          conceptual and must be independently verified, designed, and approved by licensed architects,
          structural engineers, and your local building authority before any construction begins.
        </p>
      </section>

      <section>
        <h2>3. Your Information</h2>
        <p>
          When you submit contact details through the Platform (for example, to connect with the EHBG
          team or request a follow-up), that information is sent to a third-party form-processing service
          and to the EHBG team for the purpose of following up with you. See our{' '}
          <a href="/privacy">Privacy Policy</a> for details.
        </p>
      </section>

      <section>
        <h2>4. Acceptable Use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the Platform for any unlawful purpose</li>
          <li>Attempt to disrupt, overload, or reverse-engineer the Platform</li>
          <li>Submit false contact information to impersonate another person</li>
          <li>Use generated content to misrepresent a property as having been professionally designed or engineered when it has not</li>
        </ul>
      </section>

      <section>
        <h2>5. Ownership</h2>
        <p>
          The concept boards, blueprints, and narratives generated for you are yours to use for personal
          planning purposes. The Platform's underlying software, templates, and design system remain the
          property of My Everlasting Home / EHBG.
        </p>
      </section>

      <section>
        <h2>6. No Warranty</h2>
        <p>
          The Platform is provided "as is," without warranties of any kind, express or implied, including
          accuracy, fitness for a particular purpose, or that any generated content is buildable as
          described. AI-generated content may contain errors or inconsistencies.
        </p>
      </section>

      <section>
        <h2>7. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, My Everlasting Home and EHBG are not liable for any
          indirect, incidental, or consequential damages arising from your use of the Platform or reliance
          on any generated content.
        </p>
      </section>

      <section>
        <h2>8. Changes</h2>
        <p>
          We may update these Terms from time to time. Continued use of the Platform after changes are
          posted constitutes acceptance of the updated Terms.
        </p>
      </section>

      <section>
        <h2>9. Contact</h2>
        <p>
          Questions about these Terms can be sent through our <a href="/contact">Contact page</a>.
        </p>
      </section>
    </LegalPageLayout>
  )
}
