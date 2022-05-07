
import { Router } from 'express'
import nodemailer from 'nodemailer'
import { makeSubmitFeedbackUsecase } from './factories';

export const routes = Router()

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body
  
  const submitFeedback = makeSubmitFeedbackUsecase()
  await submitFeedback.execute({ type, comment, screenshot })
  

  return res.status(201).send()
})