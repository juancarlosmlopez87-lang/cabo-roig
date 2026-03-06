'use client'
import { useState } from 'react'
import { apartments, formatEur } from '@/lib/apartments'

interface Cliente {
  id: string
  nombre: string
  apellidos: string
  telefono: string
  email: string
  dni: string
  notas: string
  interesadoEn: string[]
  estado: 'interesado' | 'visita_programada' | 'oferta' | 'reservado' | 'descartado'
  fechaRegistro: string
}

interface Visita {
  id: string
  clienteId: string
  apartamentoId: string
  fecha: string
  hora: string
  notas: string
  realizada: boolean
}

const estadoLabels: Record<string, string> = {
  interesado: 'Interesado',
  visita_programada: 'Visita programada',
  oferta: 'Oferta realizada',
  reservado: 'Reservado',
  descartado: 'Descartado',
}
const estadoColors: Record<string, string> = {
  interesado: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  visita_programada: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
  oferta: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
  reservado: 'text-green-400 bg-green-500/10 border-green-500/30',
  descartado: 'text-red-400 bg-red-500/10 border-red-500/30',
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

export default function CRMPage() {
  const [tab, setTab] = useState<'clientes' | 'calendario' | 'resumen'>('clientes')
  const [clientes, setClientes] = useState<Cliente[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('crm_clientes')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  const [visitas, setVisitas] = useState<Visita[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('crm_visitas')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  const [showForm, setShowForm] = useState(false)
  const [showVisitaForm, setShowVisitaForm] = useState(false)
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null)
  const [selectedCliente, setSelectedCliente] = useState<string | null>(null)
  const [filtroEstado, setFiltroEstado] = useState<string>('todos')
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  })

  // Form states
  const [formCliente, setFormCliente] = useState({
    nombre: '', apellidos: '', telefono: '', email: '', dni: '', notas: '', interesadoEn: [] as string[], estado: 'interesado' as Cliente['estado']
  })
  const [formVisita, setFormVisita] = useState({
    clienteId: '', apartamentoId: '', fecha: '', hora: '', notas: ''
  })

  function saveClientes(list: Cliente[]) {
    setClientes(list)
    if (typeof window !== 'undefined') localStorage.setItem('crm_clientes', JSON.stringify(list))
  }
  function saveVisitas(list: Visita[]) {
    setVisitas(list)
    if (typeof window !== 'undefined') localStorage.setItem('crm_visitas', JSON.stringify(list))
  }

  function handleSaveCliente() {
    if (!formCliente.nombre || !formCliente.telefono) return
    if (editingCliente) {
      const updated = clientes.map(c => c.id === editingCliente.id ? { ...c, ...formCliente } : c)
      saveClientes(updated)
    } else {
      const nuevo: Cliente = {
        id: generateId(),
        ...formCliente,
        fechaRegistro: new Date().toLocaleDateString('es-ES')
      }
      saveClientes([nuevo, ...clientes])
    }
    resetForm()
  }

  function handleDeleteCliente(id: string) {
    saveClientes(clientes.filter(c => c.id !== id))
    saveVisitas(visitas.filter(v => v.clienteId !== id))
    if (selectedCliente === id) setSelectedCliente(null)
  }

  function handleEditCliente(c: Cliente) {
    setEditingCliente(c)
    setFormCliente({
      nombre: c.nombre, apellidos: c.apellidos, telefono: c.telefono,
      email: c.email, dni: c.dni, notas: c.notas,
      interesadoEn: c.interesadoEn, estado: c.estado
    })
    setShowForm(true)
  }

  function resetForm() {
    setFormCliente({ nombre: '', apellidos: '', telefono: '', email: '', dni: '', notas: '', interesadoEn: [], estado: 'interesado' })
    setEditingCliente(null)
    setShowForm(false)
  }

  function handleSaveVisita() {
    if (!formVisita.clienteId || !formVisita.fecha || !formVisita.hora) return
    const nueva: Visita = { id: generateId(), ...formVisita, realizada: false }
    saveVisitas([nueva, ...visitas])
    // Update client status
    const updated = clientes.map(c => c.id === formVisita.clienteId ? { ...c, estado: 'visita_programada' as const } : c)
    saveClientes(updated)
    setFormVisita({ clienteId: '', apartamentoId: '', fecha: '', hora: '', notas: '' })
    setShowVisitaForm(false)
  }

  function toggleVisitaRealizada(id: string) {
    saveVisitas(visitas.map(v => v.id === id ? { ...v, realizada: !v.realizada } : v))
  }

  function toggleAptInterest(aptId: string) {
    setFormCliente(f => ({
      ...f,
      interesadoEn: f.interesadoEn.includes(aptId)
        ? f.interesadoEn.filter(x => x !== aptId)
        : [...f.interesadoEn, aptId]
    }))
  }

  // Calendar helpers
  const [calYear, calMonth] = calendarMonth.split('-').map(Number)
  const daysInMonth = new Date(calYear, calMonth, 0).getDate()
  const firstDay = new Date(calYear, calMonth - 1, 1).getDay()
  const calDays = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const adjustedFirst = firstDay === 0 ? 6 : firstDay - 1 // Monday start

  function getVisitasForDay(day: number) {
    const dateStr = `${calYear}-${String(calMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return visitas.filter(v => v.fecha === dateStr)
  }

  const filteredClientes = filtroEstado === 'todos' ? clientes : clientes.filter(c => c.estado === filtroEstado)
  const clienteDetail = selectedCliente ? clientes.find(c => c.id === selectedCliente) : null
  const clienteVisitas = selectedCliente ? visitas.filter(v => v.clienteId === selectedCliente) : []

  // Resumen stats
  const stats = {
    total: clientes.length,
    interesados: clientes.filter(c => c.estado === 'interesado').length,
    visitasProgramadas: clientes.filter(c => c.estado === 'visita_programada').length,
    ofertas: clientes.filter(c => c.estado === 'oferta').length,
    reservados: clientes.filter(c => c.estado === 'reservado').length,
    visitasTotales: visitas.length,
    visitasRealizadas: visitas.filter(v => v.realizada).length,
  }

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="gold-line-center mb-6" />
          <h1 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: 'Playfair Display' }}>
            CRM <span className="italic text-[#c9a96e]">Inmobiliario</span>
          </h1>
          <p className="text-[#888] text-sm">Gestión de clientes, visitas y seguimiento — Residencial Diamant Blue</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-1 mb-10">
          {([
            { key: 'clientes', label: 'Clientes' },
            { key: 'calendario', label: 'Calendario' },
            { key: 'resumen', label: 'Resumen' },
          ] as const).map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-6 py-3 text-sm tracking-wider uppercase transition-all ${tab === t.key ? 'bg-[#c9a96e] text-black font-semibold' : 'border border-[#333] text-[#888] hover:text-white hover:border-[#555]'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ========== TAB CLIENTES ========== */}
        {tab === 'clientes' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Client list */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex gap-2 flex-wrap">
                  {['todos', 'interesado', 'visita_programada', 'oferta', 'reservado', 'descartado'].map(e => (
                    <button key={e} onClick={() => setFiltroEstado(e)}
                      className={`px-3 py-1.5 text-xs tracking-wider uppercase transition-all ${filtroEstado === e ? 'bg-[#c9a96e] text-black' : 'border border-[#333] text-[#888] hover:text-white'}`}>
                      {e === 'todos' ? 'Todos' : estadoLabels[e]}
                    </button>
                  ))}
                </div>
                <button onClick={() => { resetForm(); setShowForm(true) }}
                  className="btn-gold text-xs !px-5 !py-2.5">
                  + Nuevo cliente
                </button>
              </div>

              {filteredClientes.length === 0 ? (
                <div className="text-center py-16 border border-white/5">
                  <p className="text-[#555] text-lg mb-2">No hay clientes</p>
                  <p className="text-[#444] text-sm">Añada un nuevo cliente para comenzar</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredClientes.map(c => (
                    <div key={c.id}
                      onClick={() => setSelectedCliente(c.id)}
                      className={`p-5 border transition-all cursor-pointer ${selectedCliente === c.id ? 'border-[#c9a96e] bg-[#c9a96e]/5' : 'border-white/10 hover:border-white/20'}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <p className="font-medium truncate">{c.nombre} {c.apellidos}</p>
                            <span className={`px-2 py-0.5 text-[10px] tracking-wider uppercase border ${estadoColors[c.estado]}`}>
                              {estadoLabels[c.estado]}
                            </span>
                          </div>
                          <p className="text-xs text-[#888]">{c.telefono} · {c.email}</p>
                          {c.interesadoEn.length > 0 && (
                            <p className="text-xs text-[#c9a96e] mt-1">
                              Interesado en: {c.interesadoEn.map(id => apartments.find(a => a.id === id)?.unit).filter(Boolean).join(', ')}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button onClick={e => { e.stopPropagation(); handleEditCliente(c) }}
                            className="text-xs text-[#888] hover:text-[#c9a96e]">Editar</button>
                          <button onClick={e => { e.stopPropagation(); handleDeleteCliente(c.id) }}
                            className="text-xs text-[#888] hover:text-red-400">Eliminar</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Client detail or form */}
            <div>
              {showForm ? (
                <div className="p-6 border border-[#c9a96e]/20 bg-[#0f0f0f] sticky top-24">
                  <h3 className="text-lg font-light mb-6" style={{ fontFamily: 'Playfair Display' }}>
                    {editingCliente ? 'Editar cliente' : 'Nuevo cliente'}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs tracking-wider uppercase text-[#888] block mb-1">Nombre *</label>
                      <input className="luxury-input !py-3" value={formCliente.nombre} onChange={e => setFormCliente(f => ({ ...f, nombre: e.target.value }))} />
                    </div>
                    <div>
                      <label className="text-xs tracking-wider uppercase text-[#888] block mb-1">Apellidos</label>
                      <input className="luxury-input !py-3" value={formCliente.apellidos} onChange={e => setFormCliente(f => ({ ...f, apellidos: e.target.value }))} />
                    </div>
                    <div>
                      <label className="text-xs tracking-wider uppercase text-[#888] block mb-1">Telefono *</label>
                      <input type="tel" className="luxury-input !py-3" value={formCliente.telefono} onChange={e => setFormCliente(f => ({ ...f, telefono: e.target.value }))} />
                    </div>
                    <div>
                      <label className="text-xs tracking-wider uppercase text-[#888] block mb-1">Email</label>
                      <input type="email" className="luxury-input !py-3" value={formCliente.email} onChange={e => setFormCliente(f => ({ ...f, email: e.target.value }))} />
                    </div>
                    <div>
                      <label className="text-xs tracking-wider uppercase text-[#888] block mb-1">DNI / NIE</label>
                      <input className="luxury-input !py-3" value={formCliente.dni} onChange={e => setFormCliente(f => ({ ...f, dni: e.target.value }))} />
                    </div>
                    <div>
                      <label className="text-xs tracking-wider uppercase text-[#888] block mb-1">Estado</label>
                      <select className="luxury-input !py-3" value={formCliente.estado}
                        onChange={e => setFormCliente(f => ({ ...f, estado: e.target.value as Cliente['estado'] }))}>
                        {Object.entries(estadoLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs tracking-wider uppercase text-[#888] block mb-2">Apartamentos de interes</label>
                      <div className="grid grid-cols-3 gap-2">
                        {apartments.map(a => (
                          <button key={a.id} type="button"
                            onClick={() => toggleAptInterest(a.id)}
                            className={`px-2 py-1.5 text-xs border transition-all ${formCliente.interesadoEn.includes(a.id) ? 'border-[#c9a96e] bg-[#c9a96e]/10 text-[#c9a96e]' : 'border-[#333] text-[#888] hover:border-[#555]'}`}>
                            {a.unit}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs tracking-wider uppercase text-[#888] block mb-1">Notas</label>
                      <textarea className="luxury-input !py-3" rows={3} value={formCliente.notas}
                        onChange={e => setFormCliente(f => ({ ...f, notas: e.target.value }))} />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button onClick={resetForm} className="btn-outline flex-1 !py-3 text-xs">Cancelar</button>
                      <button onClick={handleSaveCliente} className="btn-gold flex-1 !py-3 text-xs">
                        {editingCliente ? 'Guardar' : 'Crear cliente'}
                      </button>
                    </div>
                  </div>
                </div>
              ) : clienteDetail ? (
                <div className="p-6 border border-[#c9a96e]/20 bg-[#0f0f0f] sticky top-24">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-light" style={{ fontFamily: 'Playfair Display' }}>
                        {clienteDetail.nombre} {clienteDetail.apellidos}
                      </h3>
                      <span className={`inline-block mt-2 px-2 py-0.5 text-[10px] tracking-wider uppercase border ${estadoColors[clienteDetail.estado]}`}>
                        {estadoLabels[clienteDetail.estado]}
                      </span>
                    </div>
                    <button onClick={() => setSelectedCliente(null)} className="text-[#888] hover:text-white text-xs">Cerrar</button>
                  </div>
                  <div className="space-y-3 text-sm mb-6">
                    <div className="flex justify-between"><span className="text-[#888]">Telefono</span><span>{clienteDetail.telefono}</span></div>
                    <div className="flex justify-between"><span className="text-[#888]">Email</span><span className="text-right">{clienteDetail.email || '—'}</span></div>
                    <div className="flex justify-between"><span className="text-[#888]">DNI/NIE</span><span>{clienteDetail.dni || '—'}</span></div>
                    <div className="flex justify-between"><span className="text-[#888]">Registro</span><span>{clienteDetail.fechaRegistro}</span></div>
                  </div>

                  {clienteDetail.interesadoEn.length > 0 && (
                    <div className="mb-6">
                      <p className="text-xs tracking-wider uppercase text-[#c9a96e] mb-2">Apartamentos de interes</p>
                      <div className="space-y-2">
                        {clienteDetail.interesadoEn.map(id => {
                          const a = apartments.find(x => x.id === id)
                          if (!a) return null
                          return (
                            <div key={id} className="flex justify-between text-sm p-2 border border-white/5">
                              <span>{a.unit} — {a.bedrooms}d, {a.area}m²</span>
                              <span className="text-[#c9a96e]">{formatEur(a.price)}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {clienteDetail.notas && (
                    <div className="mb-6">
                      <p className="text-xs tracking-wider uppercase text-[#c9a96e] mb-2">Notas</p>
                      <p className="text-sm text-[#aaa] bg-[#1a1a1a] p-3 border border-white/5">{clienteDetail.notas}</p>
                    </div>
                  )}

                  {/* Client visits */}
                  <div className="mb-6">
                    <p className="text-xs tracking-wider uppercase text-[#c9a96e] mb-2">Visitas ({clienteVisitas.length})</p>
                    {clienteVisitas.length === 0 ? (
                      <p className="text-xs text-[#555]">Sin visitas programadas</p>
                    ) : (
                      <div className="space-y-2">
                        {clienteVisitas.map(v => {
                          const apt = apartments.find(a => a.id === v.apartamentoId)
                          return (
                            <div key={v.id} className={`p-3 border text-sm ${v.realizada ? 'border-green-500/20 bg-green-500/5' : 'border-white/5'}`}>
                              <div className="flex justify-between items-center">
                                <div>
                                  <p>{apt ? `Apt ${apt.unit}` : 'General'} — {v.fecha} {v.hora}</p>
                                  {v.notas && <p className="text-xs text-[#888] mt-1">{v.notas}</p>}
                                </div>
                                <button onClick={() => toggleVisitaRealizada(v.id)}
                                  className={`text-xs px-2 py-1 border ${v.realizada ? 'border-green-500/30 text-green-400' : 'border-[#333] text-[#888] hover:text-white'}`}>
                                  {v.realizada ? 'Realizada' : 'Pendiente'}
                                </button>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => {
                      setFormVisita(f => ({ ...f, clienteId: clienteDetail.id }))
                      setShowVisitaForm(true)
                      setTab('calendario')
                    }} className="btn-outline flex-1 !py-3 text-xs">
                      Programar visita
                    </button>
                    <button onClick={() => handleEditCliente(clienteDetail)} className="btn-gold flex-1 !py-3 text-xs">
                      Editar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6 border border-white/5 text-center sticky top-24">
                  <p className="text-[#555] text-sm">Seleccione un cliente para ver su ficha</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========== TAB CALENDARIO ========== */}
        {tab === 'calendario' && (
          <div>
            {/* New visit form */}
            {showVisitaForm && (
              <div className="p-6 border border-[#c9a96e]/20 bg-[#0f0f0f] mb-8">
                <h3 className="text-lg font-light mb-6" style={{ fontFamily: 'Playfair Display' }}>Programar visita</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs tracking-wider uppercase text-[#888] block mb-1">Cliente *</label>
                    <select className="luxury-input !py-3" value={formVisita.clienteId}
                      onChange={e => setFormVisita(f => ({ ...f, clienteId: e.target.value }))}>
                      <option value="">Seleccionar cliente</option>
                      {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre} {c.apellidos}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs tracking-wider uppercase text-[#888] block mb-1">Apartamento</label>
                    <select className="luxury-input !py-3" value={formVisita.apartamentoId}
                      onChange={e => setFormVisita(f => ({ ...f, apartamentoId: e.target.value }))}>
                      <option value="">General / Todos</option>
                      {apartments.map(a => <option key={a.id} value={a.id}>Apt {a.unit} — {formatEur(a.price)}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs tracking-wider uppercase text-[#888] block mb-1">Fecha *</label>
                    <input type="date" className="luxury-input !py-3" value={formVisita.fecha}
                      onChange={e => setFormVisita(f => ({ ...f, fecha: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-xs tracking-wider uppercase text-[#888] block mb-1">Hora *</label>
                    <input type="time" className="luxury-input !py-3" value={formVisita.hora}
                      onChange={e => setFormVisita(f => ({ ...f, hora: e.target.value }))} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs tracking-wider uppercase text-[#888] block mb-1">Notas</label>
                    <textarea className="luxury-input !py-3" rows={2} value={formVisita.notas}
                      onChange={e => setFormVisita(f => ({ ...f, notas: e.target.value }))} />
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button onClick={() => { setShowVisitaForm(false); setFormVisita({ clienteId: '', apartamentoId: '', fecha: '', hora: '', notas: '' }) }}
                    className="btn-outline flex-1 !py-3 text-xs">Cancelar</button>
                  <button onClick={handleSaveVisita} className="btn-gold flex-1 !py-3 text-xs">Guardar visita</button>
                </div>
              </div>
            )}

            {/* Calendar header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button onClick={() => {
                  const d = new Date(calYear, calMonth - 2, 1)
                  setCalendarMonth(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`)
                }} className="text-[#888] hover:text-white text-lg px-3">&lt;</button>
                <h2 className="text-xl font-light min-w-[200px] text-center" style={{ fontFamily: 'Playfair Display' }}>
                  {new Date(calYear, calMonth - 1).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                </h2>
                <button onClick={() => {
                  const d = new Date(calYear, calMonth, 1)
                  setCalendarMonth(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`)
                }} className="text-[#888] hover:text-white text-lg px-3">&gt;</button>
              </div>
              {!showVisitaForm && (
                <button onClick={() => setShowVisitaForm(true)} className="btn-gold text-xs !px-5 !py-2.5">
                  + Nueva visita
                </button>
              )}
            </div>

            {/* Calendar grid */}
            <div className="border border-white/10">
              {/* Day headers */}
              <div className="grid grid-cols-7 border-b border-white/10">
                {['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'].map(d => (
                  <div key={d} className="p-3 text-center text-xs tracking-wider uppercase text-[#c9a96e]">{d}</div>
                ))}
              </div>
              {/* Days */}
              <div className="grid grid-cols-7">
                {Array.from({ length: adjustedFirst }).map((_, i) => (
                  <div key={`empty-${i}`} className="p-3 min-h-[100px] border-b border-r border-white/5 bg-[#0a0a0a]" />
                ))}
                {calDays.map(day => {
                  const dayVisitas = getVisitasForDay(day)
                  const isToday = new Date().getDate() === day && new Date().getMonth() + 1 === calMonth && new Date().getFullYear() === calYear
                  return (
                    <div key={day} className={`p-2 min-h-[100px] border-b border-r border-white/5 ${isToday ? 'bg-[#c9a96e]/5' : ''}`}>
                      <p className={`text-sm mb-1 ${isToday ? 'text-[#c9a96e] font-semibold' : 'text-[#888]'}`}>{day}</p>
                      {dayVisitas.map(v => {
                        const cliente = clientes.find(c => c.id === v.clienteId)
                        const apt = apartments.find(a => a.id === v.apartamentoId)
                        return (
                          <div key={v.id}
                            onClick={() => toggleVisitaRealizada(v.id)}
                            className={`text-[10px] p-1.5 mb-1 cursor-pointer transition-all ${v.realizada ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-[#c9a96e]/10 border-[#c9a96e]/30 text-[#c9a96e]'} border`}>
                            <p className="font-semibold">{v.hora} {cliente?.nombre || '?'}</p>
                            {apt && <p className="opacity-70">Apt {apt.unit}</p>}
                            {v.notas && <p className="opacity-60 truncate">{v.notas}</p>}
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Upcoming visits list */}
            <div className="mt-8">
              <h3 className="text-lg font-light mb-4" style={{ fontFamily: 'Playfair Display' }}>Proximas visitas</h3>
              {visitas.filter(v => !v.realizada).sort((a, b) => a.fecha.localeCompare(b.fecha) || a.hora.localeCompare(b.hora)).length === 0 ? (
                <p className="text-sm text-[#555]">No hay visitas pendientes</p>
              ) : (
                <div className="space-y-2">
                  {visitas.filter(v => !v.realizada).sort((a, b) => a.fecha.localeCompare(b.fecha) || a.hora.localeCompare(b.hora)).map(v => {
                    const cliente = clientes.find(c => c.id === v.clienteId)
                    const apt = apartments.find(a => a.id === v.apartamentoId)
                    return (
                      <div key={v.id} className="flex items-center justify-between p-4 border border-white/10">
                        <div>
                          <p className="text-sm"><span className="text-[#c9a96e]">{v.fecha}</span> a las <span className="text-[#c9a96e]">{v.hora}</span></p>
                          <p className="text-xs text-[#888]">{cliente?.nombre} {cliente?.apellidos} {apt ? `— Apt ${apt.unit}` : ''}</p>
                          {v.notas && <p className="text-xs text-[#666] mt-1">{v.notas}</p>}
                        </div>
                        <button onClick={() => toggleVisitaRealizada(v.id)}
                          className="btn-outline !px-4 !py-2 text-xs">Marcar realizada</button>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========== TAB RESUMEN ========== */}
        {tab === 'resumen' && (
          <div>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { value: stats.total, label: 'Clientes totales', color: 'text-white' },
                { value: stats.interesados, label: 'Interesados', color: 'text-blue-400' },
                { value: stats.visitasProgramadas, label: 'Con visita', color: 'text-amber-400' },
                { value: stats.ofertas, label: 'Con oferta', color: 'text-purple-400' },
                { value: stats.reservados, label: 'Reservados', color: 'text-green-400' },
                { value: stats.visitasTotales, label: 'Visitas totales', color: 'text-white' },
                { value: stats.visitasRealizadas, label: 'Visitas realizadas', color: 'text-green-400' },
                { value: apartments.filter(a => a.status === 'available').length, label: 'Apts disponibles', color: 'text-[#c9a96e]' },
              ].map(s => (
                <div key={s.label} className="p-5 border border-[#c9a96e]/15 text-center">
                  <p className={`text-3xl font-light ${s.color}`} style={{ fontFamily: 'Playfair Display' }}>{s.value}</p>
                  <p className="text-xs tracking-wider uppercase text-[#888] mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Apartment status overview */}
            <h3 className="text-lg font-light mb-4" style={{ fontFamily: 'Playfair Display' }}>Estado de los apartamentos</h3>
            <div className="grid md:grid-cols-2 gap-3 mb-10">
              {apartments.map(a => {
                const interested = clientes.filter(c => c.interesadoEn.includes(a.id))
                const reserved = clientes.filter(c => c.interesadoEn.includes(a.id) && c.estado === 'reservado')
                const aptVisitas = visitas.filter(v => v.apartamentoId === a.id)
                return (
                  <div key={a.id} className="p-4 border border-white/10 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Apt {a.unit} <span className="text-[#888] text-sm font-normal">— P{a.floor}, {a.bedrooms}d, {a.area}m²</span></p>
                      <p className="text-[#c9a96e] text-sm">{formatEur(a.price)}</p>
                    </div>
                    <div className="text-right text-xs space-y-0.5">
                      <p className="text-blue-400">{interested.length} interesados</p>
                      <p className="text-amber-400">{aptVisitas.length} visitas</p>
                      {reserved.length > 0 && <p className="text-green-400">{reserved.length} reservados</p>}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Pipeline funnel */}
            <h3 className="text-lg font-light mb-4" style={{ fontFamily: 'Playfair Display' }}>Embudo de ventas</h3>
            <div className="space-y-2">
              {[
                { label: 'Interesados', count: stats.interesados, color: 'bg-blue-500', max: stats.total },
                { label: 'Con visita programada', count: stats.visitasProgramadas, color: 'bg-amber-500', max: stats.total },
                { label: 'Con oferta', count: stats.ofertas, color: 'bg-purple-500', max: stats.total },
                { label: 'Reservados', count: stats.reservados, color: 'bg-green-500', max: stats.total },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-4">
                  <span className="text-sm text-[#888] w-44 shrink-0">{s.label}</span>
                  <div className="flex-1 h-8 bg-[#1a1a1a] border border-white/5 relative overflow-hidden">
                    <div className={`h-full ${s.color} opacity-30 transition-all`}
                      style={{ width: s.max > 0 ? `${(s.count / s.max) * 100}%` : '0%' }} />
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">{s.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
