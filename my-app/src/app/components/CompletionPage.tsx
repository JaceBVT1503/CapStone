"use client";

import styles from "@/app/page.module.css";

export default function CompletionPage() {
  return (
    <div className={styles.page}>
      <main className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.titleBlock}>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>Thank You!</h1>
              <span className={styles.badge}>Completed</span>
            </div>
          </div>
        </header>

        <section className={styles.chat}>
          <div className={styles.setupForm}>
            <div className={styles.completionMessage}>
              <p className={styles.completionText}>
                Thank you for participating in this study!
              </p>
              <p className={styles.completionSubtext}>
                Your responses have been submitted successfully.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
