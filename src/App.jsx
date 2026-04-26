import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import { ThemeProvider } from '@/lib/ThemeContext';
import { OrganizerProvider } from '@/lib/deck-organizer';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import AdminRoute from '@/components/AdminRoute';
import Home from '@/pages/Home';
import Deck from '@/pages/Deck';
import DeckRunner from '@/components/deck/DeckRunner';
import AudienceQA from '@/pages/AudienceQA';
import DeckAnalytics from '@/pages/DeckAnalytics';
import DevKit from '@/pages/DevKit';
import DevOverviewPage from '@/components/devkit/pages/OverviewPage';
import DevTokensPage from '@/components/devkit/pages/TokensPage';
import DevTypographyPage from '@/components/devkit/pages/TypographyPage';
import DevScientificPage from '@/components/devkit/pages/ScientificPage';
import DevTransitionsPage from '@/components/devkit/pages/TransitionsPage';
import DevVizPage from '@/components/devkit/pages/VizPage';
import DevPatternsPage from '@/components/devkit/pages/PatternsPage';
import DevLibrariesPage from '@/components/devkit/pages/LibrariesPage';
import PKSim from '@/pages/PKSim';
import Reading from '@/pages/Reading';
// Add page imports here

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/Deck" element={<Deck />} />
      <Route path="/deck" element={<Deck />} />
      <Route path="/decks/:deckId" element={<DeckRunner />} />
      <Route path="/decks/:deckId/s/:slideIndex" element={<DeckRunner />} />
      {/* Dedicated dual-screen routes — see DeckRunner for the path-segment
          source-of-truth pattern. Legacy ?presenter=1 / ?audience=1 are
          redirected to /speaker · /audience inside DeckRunner. */}
      <Route path="/decks/:deckId/s/:slideIndex/speaker" element={<DeckRunner />} />
      <Route path="/decks/:deckId/s/:slideIndex/audience" element={<DeckRunner />} />
      <Route path="/qa/:deckId" element={<AudienceQA />} />
      {/* Reading material — full-page route, deep-linkable per item.
          Modal counterpart (ReadingMaterialPane) lives inside presenter view. */}
      <Route path="/decks/:deckId/reading" element={<Reading />} />
      <Route path="/decks/:deckId/reading/:slug" element={<Reading />} />
      <Route path="/decks/:deckId/analytics" element={<DeckAnalytics />} />
      <Route path="/pk-sim" element={<PKSim />} />
      <Route path="/PKSim" element={<PKSim />} />
      <Route path="/dev" element={<AdminRoute><DevKit /></AdminRoute>}>
        <Route index element={<DevOverviewPage />} />
        <Route path="tokens" element={<DevTokensPage />} />
        <Route path="typography" element={<DevTypographyPage />} />
        <Route path="scientific" element={<DevScientificPage />} />
        <Route path="transitions" element={<DevTransitionsPage />} />
        <Route path="viz" element={<DevVizPage />} />
        <Route path="patterns" element={<DevPatternsPage />} />
        <Route path="libraries" element={<DevLibrariesPage />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <ThemeProvider>
        <OrganizerProvider>
          <QueryClientProvider client={queryClientInstance}>
            <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <AuthenticatedApp />
            </Router>
            <Toaster />
          </QueryClientProvider>
        </OrganizerProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App