import { useState } from 'react';
import { ContactInquiry } from '../types';
import { Mail, Clock, Trash2, X, ClipboardCheck, Sparkles, Inbox } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InquiryLogsProps {
  inquiries: ContactInquiry[];
  onDelete: (id: string) => void;
  onClearAll: () => void;
  onUpdateStatus: (id: string, status: 'unread' | 'read' | 'contacted') => void;
}

export default function InquiryLogs({ inquiries, onDelete, onClearAll, onUpdateStatus }: InquiryLogsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex items-center gap-2 px-4 py-3 rounded-full bg-brand-text text-brand-card shadow-lg hover:opacity-90 transition-all font-medium text-xs uppercase tracking-wider border border-brand-text/5 cursor-pointer"
        >
          <Inbox className="w-4 h-4" />
          <span>Inquiry Inbox</span>
          {inquiries.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-brand-card">
              {inquiries.length}
            </span>
          )}
        </button>
      </div>

      {/* Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-brand-card border-l border-brand-text/10 shadow-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-brand-text flex items-center gap-1.5">
                      <Mail className="w-5 h-5 text-brand-accent" />
                      Inquiry Inbox
                    </h3>
                    <p className="text-xs text-brand-muted mt-1">
                      Submitted through contact form (stored locally)
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-full border border-brand-text/10 hover:bg-brand-text/5 text-brand-text transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-brand-text/5 mb-4 text-xs">
                  <span className="text-brand-muted font-medium">
                    {inquiries.length === 0 ? 'No messages received' : `${inquiries.length} inquiries`}
                  </span>
                  {inquiries.length > 0 && (
                    <button
                      onClick={onClearAll}
                      className="text-red-500 font-semibold hover:opacity-80 transition-opacity flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Clear All
                    </button>
                  )}
                </div>

                {/* Submissions List */}
                <div className="space-y-4 overflow-y-auto max-h-[65vh] pr-1">
                  {inquiries.length === 0 ? (
                    <div className="text-center py-12 flex flex-col items-center justify-center">
                      <Inbox className="w-10 h-10 text-brand-muted/30 mb-2" />
                      <p className="text-sm font-medium text-brand-muted">
                        Inbox is empty
                      </p>
                      <p className="text-xs text-brand-muted/75 max-w-[200px] mt-1">
                        Try filling out the contact form below to test!
                      </p>
                    </div>
                  ) : (
                    inquiries.map((inquiry) => (
                      <div
                        key={inquiry.id}
                        className="p-4 rounded-2xl border border-brand-text/5 bg-brand-text/2 flex flex-col gap-3 relative group"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="font-semibold text-sm text-brand-text">
                              {inquiry.name}
                            </h4>
                            <p className="text-xs text-brand-muted font-medium font-mono">
                              {inquiry.email}
                            </p>
                          </div>
                          <button
                            onClick={() => onDelete(inquiry.id)}
                            className="p-1 rounded text-brand-muted hover:text-red-500 hover:bg-brand-text/5 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-xs text-brand-text/90 italic leading-relaxed bg-brand-card/50 p-2.5 rounded-lg border border-brand-text/5">
                          "{inquiry.message || 'No message.'}"
                        </p>

                        <div className="flex items-center justify-between text-[10px] text-brand-muted pt-1 mt-1 border-t border-brand-text/5">
                          <span className="flex items-center gap-1 font-mono">
                            <Clock className="w-3.5 h-3.5" />
                            {inquiry.date}
                          </span>

                          <div className="flex gap-1.5">
                            <button
                              onClick={() => onUpdateStatus(inquiry.id, 'read')}
                              className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                                inquiry.status === 'read'
                                  ? 'bg-blue-500/10 text-blue-600'
                                  : 'hover:bg-brand-text/5'
                              }`}
                            >
                              Read
                            </button>
                            <button
                              onClick={() => onUpdateStatus(inquiry.id, 'contacted')}
                              className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                                inquiry.status === 'contacted'
                                  ? 'bg-emerald-500/10 text-emerald-600'
                                  : 'hover:bg-brand-text/5'
                              }`}
                            >
                              Contacted
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Tips */}
              <div className="border-t border-brand-text/5 pt-4 mt-6">
                <div className="flex gap-2.5 bg-brand-accent-soft p-3 rounded-2xl">
                  <Sparkles className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                  <p className="text-[11px] text-brand-text/90 leading-normal">
                    This interactive simulator mimics high-performance backend database listeners instantly with synchronized locally-persistent cache rules.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
