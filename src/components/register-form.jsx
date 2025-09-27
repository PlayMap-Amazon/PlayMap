import * as React from "react"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect } from "react"

function DropdownMenuRadio({choices, choice, setChoice}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{choice}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={choice} onValueChange={setChoice}>
          {choices.map((option) => (
            <DropdownMenuRadioItem key={option} value={option}>
              {option}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function firstPanel(setEmail, setPassword) { return (
<div className="grid gap-6 -mt-3">
  <div className="grid gap-3">
    <Label htmlFor="email">Email</Label>
    <Input
      id="email"
      type="email"
      placeholder="m@example.com"
      onChange={(e) => {
        setEmail(e.target.value);
      }}
      required
    />
  </div>
  <div className="grid gap-3">
    <div className="flex items-center">
      <Label htmlFor="password">Password</Label>
      <a
        href="#"
        className="ml-auto text-sm underline-offset-4 hover:underline"
      >
        Forgot your password?
      </a>
    </div>
    <Input id="password" type="password" required onChange={(e) => {
        setPassword(e.target.value);
      }} />
  </div>
</div>
)}

function secondPanel(
  studyChoice, setStudyChoice,
  challengeChoice, setChallengeChoice
) {
  return (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <Label>I'm primarly studying...</Label>
        <DropdownMenuRadio
          choices={["High School Subjects", "University Subjects", "Professional Development", "Hobbies and Interests", "Other"]}
          choice={studyChoice}
          setChoice={setStudyChoice}
        />
      </div>
      <div className="grid gap-3">
        <Label>My biggest study challenge is...</Label>
        <DropdownMenuRadio
          choices={["Staying motivated", "Remembering information", "Finding time to study", "Making studying fun", "Organizing my notes", "Other"]}
          choice={challengeChoice}
          setChoice={setChallengeChoice}
        />
      </div>
    </div>
  )
}

const companions = ["/brain.png", "/brain.png", "/brain.png", "/brain.png"]

function thirdpanel(onClickCallback) {
  return (
  <div className="grid gap-6">
    <div className="grid grid-cols-2 gap-3">
      {companions.map((companion, index) => (
        <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onClickCallback(index)}>
          <CardContent className="text-center flex flex-col items-center">
            <img src={companion} alt="Smart Assistant" className="w-28 h-25" />
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
)}

function fourthPanel(minutes, setMinutes) {
  return (
  <div className="grid gap-6">
    <div className="grid gap-3">
      <div className="flex items-center justify-center flex-col">
        <p className="text-6xl font-bold text-primary">{minutes}</p>
        <p className="text-neutral-500">minutes</p>
        <Label className="pt-2 text-xl">Deep dive session</Label>
      </div>
      <Slider
        defaultValue={[90]}
        max={180}
        step={5}
        min={5}
        className="pt-5"
        onValueChange={(value) => setMinutes(value[0])}
      />
    </div>
  </div>
)}

const reminders = [
  ["🌅", "Morning", "8:00 AM"],
  ["🌞", "Afternoon", "1:00 PM"],
  ["🌜", "Evening", "6:00 PM"],
  ["🔕", "No Reminder", "When I want"]
]

function fifthPanel(setReminder) {
  return (
  <div className="grid gap-6">
    <div className="grid grid-cols-2 gap-3">
      {reminders.map((reminder, index) => (
        <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow py-2" onClick={() => setReminder(index)}>
          <CardContent className="text-center flex flex-col items-center">
            <p className="text-5xl">{reminder[0]}</p>
            <p className="text-sm text-muted-foreground mt-2">{reminder[1]}</p>
            <p className="text-xs text-muted-foreground">{reminder[2]}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
)}

const panels = [
  [firstPanel, "Welcome to PlayMap! 🎮", "Login with your Google account or locally"],
  [secondPanel, "What's your study style? 📚", "Help us personalize your learning experience"],
  [thirdpanel, "Choose your study buddy! 🤖", "Pick your AI companion who will guide you through your learning journey"],
  [fourthPanel, "Perfect Study Sessions? ⏲️", "How long do you prefer to study in one go?"],
  [fifthPanel, "Stay on track! ⏰", "When would you like to receive study reminders?"],
]

export function RegisterForm({
  onSubmitCallback,
  className,
  ...props
}) {
  const [currentRegisterPage, setCurrentRegisterPage] = useState(0);
  const [minutes, setMinutes] = useState(90);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studyChoice, setStudyChoice] = useState("High School Subjects");
  const [challengeChoice, setChallengeChoice] = useState("Staying motivated");
  const [buddy, setBuddy] = useState(0);
  const navigate = useNavigate();

  async function handleRegister(data) {
    try {
      await onSubmitCallback(data);
      navigate("/dashboard");
    } catch (err) {
      // Optionally handle error (e.g., show message)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 overflow-hidden", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`title-${currentRegisterPage}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <CardTitle className="text-xl">{panels[currentRegisterPage][1]}</CardTitle>
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div
              key={`description-${currentRegisterPage}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <CardDescription>
                {panels[currentRegisterPage][2]}
              </CardDescription>
            </motion.div>
          </AnimatePresence>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <AnimatePresence>
                {currentRegisterPage === 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0, y:-10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-4"
                  >
                    <Button variant="outline" className="w-full">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                          d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                          fill="currentColor"
                        />
                      </svg>
                      Login with Google
                    </Button>
                    <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                      <span className="bg-card text-muted-foreground relative z-10 px-2">
                        Or continue with
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex items-center w-full justify-center gap-3 h-3 -mt-2">
                {[...Array(5)].map((_, index) => {
                  const isActive = index === currentRegisterPage;
                  const isCompleted = index < currentRegisterPage;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: 1,
                        scale: isActive ? 1.33 : 1,
                      }}
                      transition={{
                        duration: 0.4,
                        scale: { type: "spring", bounce: 0.5, duration: 0.4 },
                      }}
                      className={`rounded-full w-3 h-3 transition-colors duration-400 ${
                        isActive
                          ? "bg-primary"
                          : isCompleted
                          ? "bg-chart-2"
                          : "bg-neutral-200"
                      }`}
                    />
                  );
                })}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentRegisterPage}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.3 }}
                >
                  {(() => {
                    const panelParams = [
                      [setEmail, setPassword],
                      [studyChoice, setStudyChoice, challengeChoice, setChallengeChoice],
                      [(idx) => { setBuddy(idx); setCurrentRegisterPage((prev) => (prev + 1) % 5); }],
                      [minutes, setMinutes],
                      [(idx) => { handleRegister({
                        email,
                        password,
                        minutes,
                        studyChoice,
                        challengeChoice,
                        buddy,
                        reminder: idx
                      }); }]
                    ];
                    return panels[currentRegisterPage][0](...panelParams[currentRegisterPage]);
                  })()}
                </motion.div>
              </AnimatePresence>
              <AnimatePresence>
                {(currentRegisterPage !== 2 && currentRegisterPage !== 4) && (
                  <motion.div
                    key="continue-btn"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      type="button"
                      className="w-full cursor-pointer"
                      onClick={() => {
                        setCurrentRegisterPage((prev) => (prev + 1) % 5);
                      }}
                    >
                      Continue
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-secondary *:[a]:hover:text-muted-foreground text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
