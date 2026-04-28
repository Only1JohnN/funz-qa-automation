import 'dotenv/config';
import { RUN_MODE, shouldSendReport } from './runMode';

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

  const card = {
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
      { type: 'TextBlock', text: '❌ First Failure', weight: 'Bolder', size: 'Medium', color: 'Attention' },
      { type: 'TextBlock', text: `**${summary.firstFailure.title}**\n${summary.firstFailure.error}`, weight: 'Default', size: 'Default', color: 'Default' }
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