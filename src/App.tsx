import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Gift, Snowflake } from "lucide-react";
import Snowfall from "react-snowfall";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import result from "@/data/secretSanta.json";
import { deobfuscateString } from "./lib/utils";

type Friend = {
  name: string;
  password: string;
  secretFriend: string;
};

const App = () => {
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [password, setPassword] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const friends = result.map((f) => ({
    name: deobfuscateString(f.name),
    password: deobfuscateString(f.password),
    secretFriend: deobfuscateString(f.secretFriend),
  }));

  const handleOpenModal = (friend: Friend) => {
    setSelectedFriend(friend);
    setPassword("");
    setIsCorrect(false);
  };

  const handleCloseModal = () => {
    setSelectedFriend(null);
    setPassword("");
    setIsCorrect(false);
  };

  const handleCheckPassword = () => {
    if (selectedFriend && password === selectedFriend.password) {
      setIsCorrect(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative bg-[url('/background.jpg')] bg-cover bg-center">
      <Snowfall />
      <Card className="w-full max-w-xl mx-auto bg-slate-50 bg-opacity-70">
        <CardHeader>
          <CardTitle className="text-4xl text-red-600 font-bold text-center">
            🎅 Secret Santa 🎅 <br />
            chez Tom&Georgie
          </CardTitle>
          <CardDescription className="text-center">
            Découvre à qui tu dois offrir un cadeau ! 🎁 (max 20€)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {friends.map((friend) => (
              <Button key={friend.name} onClick={() => handleOpenModal(friend)}>
                <Gift className="mr-2 h-4 w-4" />
                {friend.name}
              </Button>
            ))}
          </div>
        </CardContent>

        <Dialog open={!!selectedFriend} onOpenChange={handleCloseModal}>
          <DialogContent className="max-w-[95%] rounded-lg">
            <DialogHeader>
              <DialogTitle>
                {isCorrect ? "Ton ami secret est..." : "Entre le mot de passe"}
              </DialogTitle>
            </DialogHeader>
            {!isCorrect ? (
              <>
                <Input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <DialogFooter>
                  <Button onClick={handleCheckPassword}>Vérifier</Button>
                </DialogFooter>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center mt-4">
                <Snowflake className="text-blue-500 w-16 h-16 animate-spin-slow" />
                <p className="text-3xl font-bold text-green-600 mt-4">
                  {selectedFriend?.secretFriend}
                </p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </Card>
    </div>
  );
};

export default App;
