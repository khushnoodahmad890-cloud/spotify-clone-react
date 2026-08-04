import { Routes, Route } from "react-router-dom";
import Queue from "./pages/Queue";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Playlists from "./pages/Playlists";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import Player from "./components/player/Player";
import MobileNav from "./components/layout/MobileNav";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Library from "./pages/Library";
import Album from "./pages/Album";
import Artist from "./pages/Artist";
import Playlist from "./pages/Playlist";
import Admin from "./pages/Admin";
import AddSong from "./pages/AddSong";
import EditSong from "./pages/EditSong";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Premium from "./pages/Premium";
import Billing from "./pages/Billing";
import NowPlaying from "./pages/NowPlaying";
import Profile from "./pages/Profile";

function SpotifyLayout() {
  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Topbar />

          <main
            className="
              flex-1
              overflow-y-auto
              bg-neutral-900
              p-4
              md:p-6
              pb-48
              md:pb-32
            "
          >
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/search" element={<Search />} />

              <Route path="/library" element={<Library />} />

              <Route path="/queue" element={<Queue />} />

              <Route
                path="/now-playing"
                element={<NowPlaying />}
              />

              <Route
                path="/playlists"
                element={<Playlists />}
              />

              <Route
                path="/album/:id"
                element={<Album />}
              />

              <Route
                path="/artist/:name"
                element={<Artist />}
              />

              <Route
                path="/playlist/:id"
                element={<Playlist />}
              />

              <Route
                path="/admin"
                element={<Admin />}
              />

              <Route
                path="/add-song"
                element={<AddSong />}
              />

              <Route
                path="/edit-song/:id"
                element={<EditSong />}
              />

              <Route
                path="/premium"
                element={<Premium />}
              />

              <Route
                path="/billing"
                element={<Billing />}
              />

              <Route
                path="/profile"
                element={<Profile />}
              />

              {/* 404 Page */}
              <Route
                path="*"
                element={
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <h1 className="text-6xl font-black text-green-500">
                        404
                      </h1>
                      <p className="text-gray-400 mt-4 text-xl">
                        Page Not Found
                      </p>
                    </div>
                  </div>
                }
              />
            </Routes>
          </main>
        </div>
      </div>

      <MobileNav />

      <Player />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <SpotifyLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}