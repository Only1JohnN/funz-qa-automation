import 'dotenv/config';
import { RUN_MODE, shouldSendReport } from './runMode';

interface TextBlock {
  type: 'TextBlock';
  text: string;
  weight?: string;
  size?: string;
  color?: string;
  wrap?: boolean;
}

interface Fact {
  title: string;
  value: string;
}

interface FactSet {
  type: 'FactSet';
  facts: Fact[];
}

interface ActionOpenUrl {
  type: 'Action.OpenUrl';
  title: string;
  url: string;
}

interface AdaptiveCard {
  type: 'AdaptiveCard';
  version: string;
  body: (TextBlock | FactSet)[];
  actions: ActionOpenUrl[];
}

export async function sendTeamsReport(summary: any) {
  if (!shouldSendReport) {
    console.log(`🔕 No Teams report (RUN_MODE=${RUN_MODE})`);
    return;
  }

  const webhookUrl = process.env.TEAMS_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('❌ TEAMS_WEBHOOK_URL not set');
    return;
  }

  const isPass = summary.failed === 0;
  const statusIcon = isPass ? '✅' : '❌';
  const statusText = isPass ? 'PASSED' : 'FAILED';

  const reportUrl = process.env.GITHUB_REPOSITORY
  ? `https://${process.env.GITHUB_REPOSITORY_OWNER}.github.io/${process.env.GITHUB_REPOSITORY}/${RUN_MODE}-report/`
  : 'https://github.com';

  const card: AdaptiveCard = {
    type: 'AdaptiveCard',
    version: '1.4',
    body: [
      {
        type: 'TextBlock',
        text: `📣 QA ${RUN_MODE.toUpperCase()} RUN — ${statusText} ${statusIcon}`,
        weight: 'Bolder',
        size: 'Large',
        color: isPass ? 'Good' : 'Attention'
      },
      {
        type: 'FactSet',
        facts: [
          { title: 'Environment', value: process.env.TEST_ENV || 'Staging' },
          { title: 'Run Mode', value: RUN_MODE },
          { title: 'Passed', value: summary.passed.toString() },
          { title: 'Failed', value: summary.failed.toString() },
          { title: 'Skipped', value: summary.skipped.toString() },
          { title: 'Duration', value: summary.duration }
        ]
      }
    ],
    actions: [
      {
        type: 'Action.OpenUrl',
        title: '🔗 View Details',
        url: reportUrl
      }
    ]
  };

  if (summary.firstFailure) {
  card.body.push(
    { type: 'TextBlock', text: '❌ Failure Details', weight: 'Bolder', size: 'Medium', color: 'Attention' },
    { type: 'TextBlock', text: `**What:** ${summary.firstFailure.description}`, wrap: true },
    { type: 'TextBlock', text: `**Impact:** ${summary.firstFailure.impact}`, wrap: true },
    { type: 'TextBlock', text: `**Error:** ${summary.firstFailure.error}`, wrap: true }
  );
}

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(card)
  });

  if (response.ok) {
    console.log(`✅ Teams report sent (${RUN_MODE} – ${statusText})`);
  } else {
    console.error(`❌ Teams failed: ${response.statusText}`);
  }
}