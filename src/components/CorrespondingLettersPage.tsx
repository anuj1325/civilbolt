import React from 'react';
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { Component4 } from "@/ui/components/Component4";
import { TimelineDashboard } from './seqcomponents/TimelineDashboard';

const CorrespondingLettersPage: React.FC = () => {
  return (
    <DefaultPageLayout>
      {/* Top Bar */}
      <Component4 text="Corresponding Letters" />
      <div className="flex h-full w-full flex-col">
        <main>
          <TimelineDashboard selectedEvent={null} selectedSequence={null} />
        </main>
      </div>
    </DefaultPageLayout>
  );
};

export default CorrespondingLettersPage;