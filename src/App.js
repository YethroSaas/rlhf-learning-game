import React, { useState, useEffect } from "react";

const levels = [
  {
    title: "Foundations of Reinforcement",
    description:
      "Learn what an RL agent is, how rewards, states, and actions work, and how to represent them in code.",
    xp: 100,
    key: "lvl1",
    resources: [
      {
        label: "Sutton & Barto Book (Ch.1–3)",
        url: "http://incompleteideas.net/book/the-book-2nd.html",
      },
      {
        label: "OpenAI Gym - CartPole",
        url: "https://www.gymlibrary.dev/environments/classic_control/cart_pole/",
      },
    ],
    example:
      "Use Python + OpenAI Gym to train a CartPole agent using random actions.",
  },
  {
    title: "Deep RL: DQNs",
    description:
      "Use deep learning (neural nets) to estimate value functions and make better decisions.",
    xp: 150,
    key: "lvl2",
    resources: [
      {
        label: "DQN in PyTorch (Official Tutorial)",
        url: "https://pytorch.org/tutorials/intermediate/reinforcement_q_learning.html",
      },
      {
        label: "DQN YouTube Walkthrough",
        url: "https://www.youtube.com/watch?v=wc-FxNENg9U",
      },
    ],
    example:
      "Train a DQN agent to solve CartPole using PyTorch and experience replay.",
  },
  {
    title: "Policy Gradients",
    description:
      "Instead of learning values, directly optimize the probability of actions using gradients.",
    xp: 200,
    key: "lvl3",
    resources: [
      {
        label: "Spinning Up: Policy Gradient",
        url: "https://spinningup.openai.com/en/latest/algorithms/vpg.html",
      },
      {
        label: "Sutton Book (Ch.13)",
        url: "http://incompleteideas.net/book/the-book-2nd.html",
      },
    ],
    example: "Implement REINFORCE to solve MountainCarContinuous-v0 in Gym.",
  },
  {
    title: "PPO (Proximal Policy Optimization)",
    description:
      "Learn how to stabilize policy updates using a clipped objective — a modern, high-performance RL algorithm.",
    xp: 250,
    key: "lvl4",
    resources: [
      {
        label: "Spinning Up: PPO",
        url: "https://spinningup.openai.com/en/latest/algorithms/ppo.html",
      },
      {
        label: "PPO From Scratch (Blog)",
        url: "https://iclr-blog-track.github.io/2022/03/25/ppo-implementation-details/",
      },
    ],
    example:
      "Train a PPO agent using Spinning Up to beat LunarLanderContinuous-v2.",
  },
  {
    title: "RLHF (Reinforcement Learning from Human Feedback)",
    description:
      "Learn how large language models are fine-tuned with human feedback using PPO and reward models.",
    xp: 300,
    key: "lvl5",
    resources: [
      {
        label: "OpenAI RLHF Blog",
        url: "https://openai.com/blog/rlhf",
      },
      {
        label: "RLHF Paper (ArXiv)",
        url: "https://arxiv.org/abs/1909.08593",
      },
      {
        label: "Hugging Face TRL Library",
        url: "https://github.com/huggingface/trl",
      },
    ],
    example:
      "Fine-tune a GPT-2 model using Hugging Face TRL with a reward model to prefer shorter summaries.",
  },
];

export default function App() {
  const [completedLevels, setCompletedLevels] = useState(() => {
    const saved = localStorage.getItem("rlhf-completed");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("rlhf-completed", JSON.stringify(completedLevels));
  }, [completedLevels]);

  const totalXP = levels.reduce((acc, l) => acc + l.xp, 0);
  const earnedXP = levels
    .filter((l) => completedLevels.includes(l.key))
    .reduce((acc, l) => acc + l.xp, 0);

  const toggleLevel = (key) => {
    setCompletedLevels((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <div style={{ maxWidth: 700, margin: "2rem auto", fontFamily: "Arial" }}>
      <h1 style={{ fontSize: "1.8rem", textAlign: "center" }}>
        🎮 RLHF Learning Game
      </h1>
      <p style={{ textAlign: "center" }}>
        XP: {earnedXP} / {totalXP}
      </p>
      <progress value={earnedXP} max={totalXP} style={{ width: "100%" }} />

      {levels.map((level, i) => {
        const isUnlocked =
          i === 0 || completedLevels.includes(levels[i - 1].key);
        const isCompleted = completedLevels.includes(level.key);

        return (
          <div
            key={level.key}
            style={{
              margin: "1rem 0",
              padding: "1rem",
              border: "1px solid #ccc",
              borderRadius: 6,
              opacity: isUnlocked ? 1 : 0.5,
              background: isCompleted ? "#e6ffe6" : "white",
            }}
          >
            <h2 style={{ marginBottom: 4 }}>
              {isCompleted ? "✅ " : isUnlocked ? "🔥 " : "🔒 "}
              {level.title}
            </h2>
            <p style={{ marginBottom: 6 }}>{level.description}</p>

            {level.example && (
              <p
                style={{
                  fontSize: "0.85rem",
                  fontStyle: "italic",
                  marginBottom: 8,
                }}
              >
                📌 Example: {level.example}
              </p>
            )}

            {level.resources && (
              <ul
                style={{
                  fontSize: "0.85rem",
                  marginTop: "0.5rem",
                  paddingLeft: "1rem",
                }}
              >
                {level.resources.map((res, index) => (
                  <li key={index}>
                    🔗{" "}
                    <a href={res.url} target="_blank" rel="noopener noreferrer">
                      {res.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}

            <button
              onClick={() => toggleLevel(level.key)}
              disabled={!isUnlocked}
              style={{ marginTop: "0.75rem" }}
            >
              {isCompleted ? "Reset" : "Complete"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
