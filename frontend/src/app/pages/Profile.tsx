import { useEffect, useState } from "react";
import { User, Mail, Award, Trophy, Target, Shield } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { api, getUser, saveUser } from "../services/api";
import { getLang, setLang, t, Lang } from "../services/i18n";

export default function Profile() {
  const [user, setUser] = useState(getUser());
  const [lang, setCurrentLang] = useState<Lang>(getLang());
  const [attempts, setAttempts] = useState([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  useEffect(() => {

  api.getUserAchievements(1)
     .then(setAchievements);

}, []);
  useEffect(() => {

  api.getUserLabAttempts(1)
     .then(setAttempts);

}, []);

  useEffect(() => {
    async function loadProfile() {
      const saved = getUser();
      if (!saved) return;

      const freshUser = await api.getUserById(saved.id);
      saveUser(freshUser);
      setUser(freshUser);
    }

    loadProfile();
  }, []);

  if (!user) {
    return <div className="p-8 text-white">Сначала войдите в аккаунт</div>;
  }

  const initials = user.username.slice(0, 2).toUpperCase();

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-white mb-2">{t("profile")}</h1>
      <p className="text-gray-400 mb-8">{t("accountProgress")}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-[#1A2234] border-[#7B61FF]/20">
          <CardContent className="p-6 text-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#00F5FF] to-[#7B61FF] flex items-center justify-center text-4xl font-bold text-white mx-auto mb-4">
              {initials}
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">
              {user.username}
            </h2>

            <div className="px-4 py-2 rounded-full bg-[#7B61FF]/20 text-[#00F5FF] text-sm font-medium inline-block mb-6 border border-[#7B61FF]/30">
              {user.role} — {t("level")} {user.level}
            </div>

            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{user.email}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-400">
                <Shield className="w-4 h-4" />
                <span className="text-sm">
                  {t("role")}: {user.role}
                </span>
              </div>

              <div className="flex items-center gap-3 text-gray-400">
                <User className="w-4 h-4" />
                <span className="text-sm">ID: {user.id}</span>
              </div>

              <div className="mt-5 text-left">
                <label className="text-sm text-gray-400">{t("language")}</label>

                <select
                  value={lang}
                  onChange={(e) => {
                    const newLang = e.target.value as Lang;
                    setLang(newLang);
                    setCurrentLang(newLang);
                  }}
                  className="w-full mt-2 bg-[#0B0F1A] border border-[#7B61FF]/40 text-white rounded-xl px-4 py-3"
                >
                  <option value="ru">Русский</option>
                  <option value="kz">Қазақша</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>

            <Button className="w-full mt-6 bg-gradient-to-r from-[#00F5FF] to-[#7B61FF] text-white">
              {t("editProfile")}
            </Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-[#1A2234] border-[#7B61FF]/20">
              <CardContent className="p-4 text-center">
                <Trophy className="w-8 h-8 text-[#00F5FF] mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">
                  {user.points}
                </div>
                <div className="text-xs text-gray-400">{t("points")}</div>
              </CardContent>
            </Card>

            <Card className="bg-[#1A2234] border-[#7B61FF]/20">
              <CardContent className="p-4 text-center">
                <Target className="w-8 h-8 text-[#7B61FF] mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">
                  {user.level}
                </div>
                <div className="text-xs text-gray-400">{t("level")}</div>
              </CardContent>
            </Card>

            <Card className="bg-[#1A2234] border-[#7B61FF]/20">
              <CardContent className="p-4 text-center">
                <Award className="w-8 h-8 text-[#00FF9D] mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">Beginner</div>
                <div className="text-xs text-gray-400">{t("rank")}</div>
              </CardContent>
            </Card>
          </div>
          

          <Card className="bg-[#1A2234] border-[#7B61FF]/20">
  <CardContent className="p-6">
    <h3 className="text-xl font-bold text-white mb-4">
      {t("progress")}
    </h3>

    <div className="space-y-4">
      <div className="p-4 bg-[#151B2E] rounded-xl">
        <div className="flex justify-between text-sm text-gray-300 mb-2">
          <span>{t("level")}</span>
          <span>
            {user.points} / {user.level * 100}
          </span>
        </div>

        <div className="w-full h-3 bg-[#0B0F1A] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#00F5FF] to-[#7B61FF]"
            style={{
              width: `${Math.min(
                (user.points / (user.level * 100)) * 100,
                100
              )}%`,
            }}
          />
        </div>
      </div>

      <div className="p-4 bg-[#151B2E] rounded-xl text-gray-300">
        HackQuest progress will be shown here.
      </div>
    </div>
  </CardContent>
</Card>

<Card className="bg-[#1A2234] border-[#7B61FF]/20">
  <CardContent className="p-6">
    <h2 className="text-xl font-bold text-white mb-4">
      Recent Lab Attempts
    </h2>

    {attempts.length === 0 ? (
      <div className="text-gray-400">
        No lab attempts yet
      </div>
    ) : (
      attempts.map((attempt: any) => (
        <div
          key={attempt.id}
          className="bg-[#151B2E] rounded-xl p-4 mb-3"
        >
          <div className="text-sm text-gray-300">
            Payload:
          </div>

          <div className="font-mono text-[#00F5FF] mb-2">
            {attempt.payload}
          </div>

          <div
            className={
              attempt.success
                ? "text-[#00FF9D]"
                : "text-[#FF3366]"
            }
          >
            {attempt.success ? "Success" : "Failed"}
          </div>
        </div>
      ))
    )}
  </CardContent>
</Card> 
<Card className="bg-[#1A2234] border-[#7B61FF]/20">
  <CardContent className="p-6">

    <h2 className="text-xl font-bold text-white mb-4">
      Achievements
    </h2>

    {achievements.length === 0 ? (

      <div className="text-gray-400">
        No achievements yet
      </div>

    ) : (

      achievements.map((achievement: any) => (

        <div
          key={achievement.id}
          className="bg-[#151B2E] rounded-xl p-4 mb-3"
        >

          <div className="text-[#00FF9D] font-bold">
            {achievement.name}
          </div>

          <div className="text-sm text-gray-400">
            {achievement.description}
          </div>

        </div>

      ))

    )}

  </CardContent>
</Card>
        </div>
      </div>
    </div>
  );
}