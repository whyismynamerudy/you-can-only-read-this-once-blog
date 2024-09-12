"use client"
import React, { useEffect, useState, useRef } from 'react';
import { getFingerprint } from "@thumbmarkjs/thumbmarkjs";

function FingerprintChecker({ slug, children }) {
  const [hasRead, setHasRead] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const checkPerformedRef = useRef(false);

  useEffect(() => {
    const checkReadStatus = async () => {
      if (checkPerformedRef.current) return;
      checkPerformedRef.current = true;

      try {
        const fingerprint = await getFingerprint();
        const response = await fetch('/api/checkReadStatus', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ slug, fingerprint }),
        });
        const { hasRead } = await response.json();
        setHasRead(hasRead);
      } catch (error) {
        console.error('Error checking read status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkReadStatus();
  }, [slug]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (hasRead) {
    return (
      <section>
        <h1 className="title font-semibold text-2xl tracking-tighter">
          You've already read this post
        </h1>
        <p>This blog post is only available to read once.</p>
        <a href="/blog" className="text-blue-500 hover:underline">
          Back to blog list
        </a>
      </section>
    );
  }

  return children;
}

export default FingerprintChecker;