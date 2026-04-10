export default function PrivacyFooter() {
  return (
    <footer className="max-w-4xl mx-auto px-4 py-6 mt-4 border-t border-gray-200">
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
    </footer>
  );
}
