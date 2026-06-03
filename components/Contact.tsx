'use client'

import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { useLang } from '@/context/LangContext'

const FORMSUBMIT = 'https://formsubmit.co/ajax/hashdiop97@gmail.com'

export default function Contact() {
  const { lang } = useLang()
  const [form, setForm] = useState({ name:'', email:'', msg:'' })
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle')
  const [err, setErr] = useState('')

  // Auto-reset après 4s
  useEffect(() => {
    if (status !== 'sent') return
    const t = setTimeout(() => setStatus('idle'), 4000)
    return () => clearTimeout(t)
  }, [status])

  const submit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.msg.trim()) {
      setErr(lang==='fr' ? 'Merci de remplir tous les champs.' : 'Please fill in all fields.')
      return
    }
    setErr(''); setStatus('sending')
    try {
      const r = await fetch(FORMSUBMIT, {
        method: 'POST',
        headers: { 'Content-Type':'application/json', Accept:'application/json' },
        body: JSON.stringify({ name:form.name, email:form.email, message:form.msg, _subject:`Message de ${form.name} — CHD Dev`, _captcha:'false' }),
      })
      if (r.ok) { setStatus('sent'); setForm({ name:'', email:'', msg:'' }) }
      else throw new Error()
    } catch { setStatus('error') }
  }

  const t = {
    title:  lang==='fr' ? 'Travaillons ensemble' : "Let's work together",
    sub:    lang==='fr' ? 'Un projet en tête ? Je réponds sous 24h.' : 'A project in mind? I reply within 24h.',
    direct: lang==='fr' ? 'Contact direct' : 'Direct contact',
    form:   lang==='fr' ? 'Envoyer un message' : 'Send a message',
    phName: lang==='fr' ? 'Votre nom' : 'Your name',
    phMail: lang==='fr' ? 'Votre email' : 'Your email',
    phMsg:  lang==='fr' ? 'Décrivez votre projet...' : 'Describe your project...',
    send:   lang==='fr' ? 'Envoyer' : 'Send',
    sent:   lang==='fr' ? 'Message reçu ! Je vous réponds sous 24h.' : 'Message received! I\'ll reply within 24h.',
    errMsg: lang==='fr' ? 'Erreur — écrivez à hashdiop97@gmail.com' : 'Error — email hashdiop97@gmail.com',
  }

  return (
    <section id="contact">
      <div className="wrap">
        <p className="s-label reveal">05 / Contact</p>
        <h2 className="s-title reveal">
          <span className="acc">{lang==='fr'?'Travaillons':'Let\'s work'}</span>{' '}
          {lang==='fr'?'ensemble':'together'}
        </h2>
        <div className="acc-bar reveal" />
        <p className="s-sub reveal">{t.sub}</p>

        <div className="contact-grid">
          {/* Infos */}
          <div>
            <p className="s-label reveal" style={{ marginBottom:16 }}>{t.direct}</p>
            {[
              { icon:'✉', title:'Email',       val:'hashdiop97@gmail.com', href:'mailto:hashdiop97@gmail.com' },
              { icon:'✆', title:lang==='fr'?'Téléphone':'Phone', val:'+221 78 192 63 37', href:'tel:+221781926337' },
              { icon:'◉', title:lang==='fr'?'Localisation':'Location', val:'Dakar, Sénégal', href:undefined },
            ].map(r => (
              <div key={r.title} className="contact-card reveal">
                <div className="c-icon">{r.icon}</div>
                <div>
                  <div className="c-title">{r.title}</div>
                  {r.href
                    ? <a href={r.href} className="c-val" style={{ textDecoration:'none', color:'var(--text-2)' }}>{r.val}</a>
                    : <div className="c-val">{r.val}</div>}
                </div>
              </div>
            ))}
            <div className="socials reveal">
              <a href="https://github.com/" target="_blank" rel="noreferrer" className="social">GitHub ↗</a>
              <a href="https://linkedin.com/in/" target="_blank" rel="noreferrer" className="social">LinkedIn ↗</a>
            </div>
          </div>

          {/* Form */}
          <div>
            <p className="s-label reveal" style={{ marginBottom:20 }}>{t.form}</p>
            {status === 'sent' ? (
              <div
                className="form-success"
                style={{ animation:'fade-up .5s cubic-bezier(.16,1,.3,1) forwards' }}
              >
                {/* Icône succès animée */}
                <div style={{
                  width:52, height:52, borderRadius:'50%',
                  background:'var(--accent-bg)', border:'2px solid var(--accent)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  margin:'0 auto 18px',
                  boxShadow:'0 0 24px var(--accent-bg)',
                }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M4 11.5l5 5L18 6" stroke="var(--accent)" strokeWidth="2.2"
                      strokeLinecap="round" strokeLinejoin="round"
                      style={{ strokeDasharray:24, strokeDashoffset:24, animation:'check-draw .4s ease .2s forwards' }}/>
                  </svg>
                </div>
                <p style={{ fontFamily:'var(--font-syne),sans-serif', fontWeight:700, fontSize:16, marginBottom:8, color:'var(--text)' }}>
                  {lang==='fr' ? 'Message envoyé !' : 'Message sent!'}
                </p>
                <p style={{ color:'var(--text-2)', fontSize:13, lineHeight:1.7, marginBottom:24 }}>
                  {t.sent}
                </p>

                {/* Barre de progression — 4s puis retour au formulaire */}
                <div style={{ width:'100%', height:2, background:'var(--border)', overflow:'hidden' }}>
                  <div style={{
                    height:'100%', background:'var(--accent)',
                    animation:'progress-back 4s linear forwards',
                  }}/>
                </div>
                <p style={{ fontFamily:'monospace', fontSize:9, letterSpacing:2, color:'var(--text-muted)', marginTop:10, textTransform:'uppercase' }}>
                  {lang==='fr' ? 'Retour dans 4s…' : 'Back in 4s…'}
                </p>

                <style dangerouslySetInnerHTML={{ __html:`
                  @keyframes check-draw    { to { stroke-dashoffset: 0; } }
                  @keyframes progress-back { from { width:100%; } to { width:0%; } }
                `}} />
              </div>
            ) : (
              <div className="form reveal">
                <div className="fg">
                  <label className="fl">{lang==='fr'?'Nom':'Name'}</label>
                  <input className="fi" placeholder={t.phName} value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} disabled={status==='sending'} />
                </div>
                <div className="fg">
                  <label className="fl">Email</label>
                  <input className="fi" type="email" placeholder={t.phMail} value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} disabled={status==='sending'} />
                </div>
                <div className="fg">
                  <label className="fl">Message</label>
                  <textarea className="ft" placeholder={t.phMsg} value={form.msg} onChange={e=>setForm(f=>({...f,msg:e.target.value}))} disabled={status==='sending'} />
                </div>
                {err && <p style={{ color:'#f87171', fontSize:11, fontFamily:'monospace' }}>{err}</p>}
                {status==='error' && <p style={{ color:'#f87171', fontSize:11, fontFamily:'monospace' }}>{t.errMsg}</p>}
                <button className="btn-send" onClick={submit} disabled={status==='sending'} style={{ opacity:status==='sending'?.7:1 }}>
                  {status==='sending' && <Loader2 size={13} className="animate-spin" />}
                  {t.send} ↗
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
