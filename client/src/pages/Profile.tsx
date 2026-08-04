import { useState } from "react";
import {
  Pencil,
  Check,
  X,
  Heart,
  ListMusic,
  CalendarDays,
  KeyRound,
  Loader2,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { usePlayer } from "../context/PlayerContext";
import { usePlaylists } from "../context/PlaylistContext";
import { useToast } from "../context/ToastContext";
import {
  updateProfile,
  changePassword,
} from "../services/authService";

const BIO_LIMIT = 280;

export default function Profile() {
  const { user, token, updateUser } = useAuth();
  const { likedSongs } = usePlayer();
  const { playlists } = usePlaylists();
  const { showToast } = useToast();

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    username: user?.username || "",
    avatar: user?.avatar || "",
    bio: user?.bio || "",
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  if (!user) return null;

  const memberSince = user.created_at
    ? new Date(user.created_at).toLocaleDateString(undefined, {
        month: "long",
        year: "numeric",
      })
    : null;

  function startEditing() {
    setForm({
      username: user!.username,
      avatar: user!.avatar || "",
      bio: user!.bio || "",
    });
    setEditing(true);
  }

  function cancelEditing() {
    setEditing(false);
  }

  async function handleSave() {
    if (!form.username.trim()) {
      showToast("Username can't be empty", "error");
      return;
    }

    try {
      setSaving(true);

      const res = await updateProfile(
        {
          username: form.username.trim(),
          avatar: form.avatar.trim(),
          bio: form.bio.trim(),
        },
        token!
      );

      updateUser(res.user);
      showToast("Profile updated", "success");
      setEditing(false);
    } catch (err: any) {
      console.error(err);
      showToast(
        err.response?.data?.message || "Failed to update profile",
        "error"
      );
    } finally {
      setSaving(false);
    }
  }

  async function handlePasswordSave() {
    if (
      !passwordForm.currentPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {
      showToast("Fill out all password fields", "error");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast("New passwords don't match", "error");
      return;
    }

    try {
      setPasswordSaving(true);

      await changePassword(
        {
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        },
        token!
      );

      showToast("Password updated", "success");
      setShowPasswordForm(false);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      console.error(err);
      showToast(
        err.response?.data?.message || "Failed to update password",
        "error"
      );
    } finally {
      setPasswordSaving(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto pb-10">
      {/* Header */}

      <div
        className="
          relative
          rounded-3xl
          overflow-hidden
          bg-gradient-to-b
          from-green-800/60
          via-neutral-900
          to-neutral-900
          p-6
          sm:p-10
        "
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
          <div
            className="
              w-28
              h-28
              sm:w-36
              sm:h-36
              rounded-full
              shrink-0
              bg-green-500
              flex
              items-center
              justify-center
              text-black
              text-5xl
              font-black
              uppercase
              shadow-2xl
              overflow-hidden
              border-4
              border-black/20
            "
          >
            {form.avatar || user.avatar ? (
              <img
                src={editing ? form.avatar : user.avatar || ""}
                alt={user.username}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              user.username.charAt(0)
            )}
          </div>

          <div className="flex-1 text-center sm:text-left min-w-0">
            <p className="text-xs uppercase tracking-widest text-gray-300 font-bold mb-1">
              Profile
            </p>

            {editing ? (
              <input
                value={form.username}
                onChange={(e) =>
                  setForm({ ...form, username: e.target.value })
                }
                className="
                  text-3xl
                  sm:text-5xl
                  font-black
                  bg-transparent
                  border-b-2
                  border-white/30
                  focus:border-green-500
                  outline-none
                  w-full
                  max-w-md
                "
              />
            ) : (
              <h1 className="text-3xl sm:text-5xl font-black truncate">
                {user.username}
              </h1>
            )}

            <p className="text-gray-400 text-sm mt-2 truncate">
              {user.email}
            </p>
          </div>

          {!editing && (
            <button
              onClick={startEditing}
              className="
                flex
                items-center
                gap-2
                bg-white
                text-black
                font-bold
                px-5
                py-2.5
                rounded-full
                hover:scale-105
                transition
                shrink-0
              "
            >
              <Pencil size={16} />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6">
        <div className="bg-neutral-900 rounded-2xl p-4 sm:p-5 text-center">
          <Heart className="mx-auto mb-2 text-green-500" size={22} />
          <p className="text-2xl font-black">{likedSongs.length}</p>
          <p className="text-xs text-gray-400 mt-0.5">Liked Songs</p>
        </div>

        <div className="bg-neutral-900 rounded-2xl p-4 sm:p-5 text-center">
          <ListMusic className="mx-auto mb-2 text-green-500" size={22} />
          <p className="text-2xl font-black">{playlists.length}</p>
          <p className="text-xs text-gray-400 mt-0.5">Playlists</p>
        </div>

        <div className="bg-neutral-900 rounded-2xl p-4 sm:p-5 text-center">
          <CalendarDays className="mx-auto mb-2 text-green-500" size={22} />
          <p className="text-sm sm:text-base font-black">
            {memberSince || "—"}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">Member Since</p>
        </div>
      </div>

      {/* Bio / Edit form */}

      <div className="bg-neutral-900 rounded-2xl p-5 sm:p-6 mt-6">
        <h2 className="text-lg font-bold mb-4">About</h2>

        {editing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Avatar URL
              </label>
              <input
                value={form.avatar}
                onChange={(e) =>
                  setForm({ ...form, avatar: e.target.value })
                }
                placeholder="https://example.com/your-photo.jpg"
                className="
                  w-full
                  p-3
                  rounded-xl
                  bg-neutral-800
                  border
                  border-neutral-700
                  outline-none
                  focus:border-green-500
                  text-sm
                "
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-gray-400">Bio</label>
                <span className="text-xs text-gray-500">
                  {form.bio.length}/{BIO_LIMIT}
                </span>
              </div>

              <textarea
                value={form.bio}
                maxLength={BIO_LIMIT}
                onChange={(e) =>
                  setForm({ ...form, bio: e.target.value })
                }
                rows={4}
                placeholder="Tell people what you're into..."
                className="
                  w-full
                  p-3
                  rounded-xl
                  bg-neutral-800
                  border
                  border-neutral-700
                  outline-none
                  focus:border-green-500
                  resize-y
                  text-sm
                "
              />
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={handleSave}
                disabled={saving}
                className="
                  flex
                  items-center
                  gap-2
                  bg-green-500
                  hover:bg-green-400
                  disabled:opacity-60
                  text-black
                  font-bold
                  px-5
                  py-2.5
                  rounded-full
                  transition
                "
              >
                {saving ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Check size={16} />
                )}
                Save
              </button>

              <button
                onClick={cancelEditing}
                disabled={saving}
                className="
                  flex
                  items-center
                  gap-2
                  bg-neutral-800
                  hover:bg-neutral-700
                  text-white
                  font-bold
                  px-5
                  py-2.5
                  rounded-full
                  transition
                "
              >
                <X size={16} />
                Cancel
              </button>
            </div>
          </div>
        ) : user.bio ? (
          <p className="text-gray-300 leading-relaxed whitespace-pre-line">
            {user.bio}
          </p>
        ) : (
          <p className="text-gray-500 text-sm">
            No bio yet. Click "Edit Profile" to add one.
          </p>
        )}
      </div>

      {/* Password */}

      <div className="bg-neutral-900 rounded-2xl p-5 sm:p-6 mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <KeyRound size={18} />
            Password
          </h2>

          {!showPasswordForm && (
            <button
              onClick={() => setShowPasswordForm(true)}
              className="
                text-sm
                font-semibold
                text-green-400
                hover:text-green-300
                transition
              "
            >
              Change password
            </button>
          )}
        </div>

        {showPasswordForm && (
          <div className="space-y-4 mt-5">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Current password
              </label>
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    currentPassword: e.target.value,
                  })
                }
                className="
                  w-full
                  p-3
                  rounded-xl
                  bg-neutral-800
                  border
                  border-neutral-700
                  outline-none
                  focus:border-green-500
                  text-sm
                "
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  New password
                </label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      newPassword: e.target.value,
                    })
                  }
                  className="
                    w-full
                    p-3
                    rounded-xl
                    bg-neutral-800
                    border
                    border-neutral-700
                    outline-none
                    focus:border-green-500
                    text-sm
                  "
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Confirm new password
                </label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="
                    w-full
                    p-3
                    rounded-xl
                    bg-neutral-800
                    border
                    border-neutral-700
                    outline-none
                    focus:border-green-500
                    text-sm
                  "
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={handlePasswordSave}
                disabled={passwordSaving}
                className="
                  flex
                  items-center
                  gap-2
                  bg-green-500
                  hover:bg-green-400
                  disabled:opacity-60
                  text-black
                  font-bold
                  px-5
                  py-2.5
                  rounded-full
                  transition
                "
              >
                {passwordSaving ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Check size={16} />
                )}
                Update Password
              </button>

              <button
                onClick={() => {
                  setShowPasswordForm(false);
                  setPasswordForm({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  });
                }}
                disabled={passwordSaving}
                className="
                  flex
                  items-center
                  gap-2
                  bg-neutral-800
                  hover:bg-neutral-700
                  text-white
                  font-bold
                  px-5
                  py-2.5
                  rounded-full
                  transition
                "
              >
                <X size={16} />
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
