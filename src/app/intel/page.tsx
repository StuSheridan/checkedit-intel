import MonthlyInsight from '@/components/intel/MonthlyInsight';
import ComplianceProfile from '@/components/intel/ComplianceProfile';
import PlatformIntelligence from '@/components/intel/PlatformIntelligence';
import GenerateIntel from '@/components/intel/GenerateIntel';
import ProgressStrip from '@/components/intel/ProgressStrip';

export default function IntelPage() {
  return (
    <div className="mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-brand-title-text my-2">Checkedit Intel</h1>
        <p className="text-sm text-brand-body-text">
          Your compliance intelligence centre — powered by Checkedit.
        </p>
      </div>

      <GenerateIntel />
      <ProgressStrip />
      <MonthlyInsight />
      <ComplianceProfile />
      <PlatformIntelligence />
    </div>
  );
}
