export default function PrivacyFooter() {
  return (
    <footer className="max-w-4xl mx-auto px-4 pt-4 pb-8 mt-4 border-t border-gray-200 space-y-3">
      {/* Privacy notice */}
      <div className="flex items-start gap-3 bg-gray-50 rounded-xl px-4 py-3.5">
        <span className="text-gray-400 text-base flex-shrink-0 mt-0.5">🔒</span>
        <p className="text-xs text-gray-500 leading-relaxed">
          <strong className="text-gray-600">Privacy:</strong> This app does not
          collect any personal data. Your quiz progress and &lsquo;Mistake
          Bank&rsquo; are stored locally on your own device (LocalStorage). No
          data is sent to a server. To clear your data, simply clear your
          browser cache.
        </p>
      </div>

      {/* Credits */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-1">
        <div className="flex flex-col gap-0.5">
          <p className="text-xs text-gray-400">
            <span className="text-gray-500 font-medium">Lead Developer:</span>{' '}
            Emre Kocyigit
          </p>
          <p className="text-xs text-gray-400">
            <span className="text-gray-500 font-medium">AI Collaborators:</span>{' '}
            Claude Code &amp; Gemini
          </p>
        </div>
        <p className="text-xs text-gray-400 sm:text-right">
          <span className="text-gray-500 font-medium">Version:</span>{' '}
          2026 Edition{' '}
          <span className="text-gray-300">·</span>{' '}
          Updated for Grand Duke Guillaume&nbsp;V
        </p>
      </div>
    </footer>
  );
}
