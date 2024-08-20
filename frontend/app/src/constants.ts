import { ProjectStatus } from 'use-cases/src/project'
import { NodeColorDefinition } from './types'

export const Colors = {
  Blue800: '#1e40af',
  Blue600: '#2563eb',
  Red600: '#dc2626',
  Red500: '#ef4444',
  Green600: '#16a34a',
  Green400: '#4ade80',
  Gray50: '#fafafa',
  Gray400: '#a1a1aa',
  Gray600: '#52525b',
  Gray800: '#27272a',
  Gray900: '#18181b',
  White: '#ffffff',
  Black: '#000000',
} as const

export const NodeColors: Record<ProjectStatus, NodeColorDefinition> = {
  normal: {
    normal: {
      background: Colors.White,
      border: Colors.Gray600,
    },
    highlight: {
      background: Colors.Gray50,
      border: Colors.Gray400,
    },
  },
  ongoing: {
    normal: {
      background: Colors.White,
      border: Colors.Blue800,
    },
    highlight: {
      background: Colors.Gray50,
      border: Colors.Blue600,
    },
  },
  done: {
    normal: {
      background: Colors.White,
      border: Colors.Green600,
    },
    highlight: {
      background: Colors.Gray50,
      border: Colors.Green400,
    },
  },
  // blocked: {
  //   normal: {
  //     background: Colors.Gray50,
  //     border: Colors.Gray600,
  //   },
  //   highlight: {
  //     background: Colors.Gray50,
  //     border: Colors.Gray400,
  //   },
  // },
  // urgent: {
  //   normal: {
  //     background: Colors.White,
  //     border: Colors.Red600,
  //   },
  //   highlight: {
  //     background: Colors.Gray50,
  //     border: Colors.Red500,
  //   },
  // },
}
