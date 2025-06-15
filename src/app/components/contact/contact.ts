import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslationService } from '../../services/TranslationService';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  attachments?: File[];
}

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements OnInit, OnDestroy {

  // Inicialización definida del FormGroup
  contactForm!: FormGroup;
  selectedFiles: File[] = [];
  currentLanguage: string = 'es';
  isSubmitting: boolean = false;
  formStatus: 'success' | 'error' | 'sending' | null = null;
  isDragOver: boolean = false;

  email = 'victoryorddiazgonzales@gmail.com';

  private languageSubscription!: Subscription;
  private readonly maxFileSize = 10 * 1024 * 1024; // 10MB
  private readonly allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/jpg',
    'image/png'
  ];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    public translationService: TranslationService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.languageSubscription = this.translationService.currentLanguage$.subscribe(
      lang => {
        this.currentLanguage = lang;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  private initializeForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      company: [''],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  // Método helper para obtener traducción
  t(key: string): string {
    return this.translationService.translate(key);
  }

  // Manejo de archivos
  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      const files = Array.from(target.files);
      this.processFiles(files);
    }
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;

    if (event.dataTransfer?.files) {
      const files = Array.from(event.dataTransfer.files);
      this.processFiles(files);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  private processFiles(files: File[]): void {
    const validFiles: File[] = [];
    const errors: string[] = [];

    files.forEach(file => {
      // Verificar tipo de archivo
      if (!this.allowedTypes.includes(file.type)) {
        errors.push(`${file.name}: Tipo de archivo no permitido`);
        return;
      }

      // Verificar tamaño
      if (file.size > this.maxFileSize) {
        errors.push(`${file.name}: Archivo muy grande (max 10MB)`);
        return;
      }

      // Verificar si ya existe
      if (this.selectedFiles.some(f => f.name === file.name && f.size === file.size)) {
        errors.push(`${file.name}: Archivo ya seleccionado`);
        return;
      }

      validFiles.push(file);
    });

    // Agregar archivos válidos
    this.selectedFiles = [...this.selectedFiles, ...validFiles];

    // Mostrar errores si los hay
    if (errors.length > 0) {
      this.snackBar.open(
        `Algunos archivos no se pudieron agregar: ${errors.join(', ')}`,
        'Cerrar',
        { duration: 5000, panelClass: ['error-snackbar'] }
      );
    }

    // Mostrar éxito si se agregaron archivos
    if (validFiles.length > 0) {
      this.snackBar.open(
        `${validFiles.length} archivo(s) agregado(s) correctamente`,
        'Cerrar',
        { duration: 3000, panelClass: ['success-snackbar'] }
      );
    }
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Envío del formulario
  async onSubmit(): Promise<void> {
    if (!this.contactForm.valid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.formStatus = 'sending';

    try {
      const formData = this.contactForm.value as ContactFormData;

      // Enviar usando EmailJS (recomendado para frontend)
      await this.sendWithEmailJS(formData);

      this.formStatus = 'success';
      this.showSuccessMessage();
      this.resetForm();

    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      this.formStatus = 'error';
      this.showErrorMessage();
    } finally {
      this.isSubmitting = false;
      // Limpiar estado después de 5 segundos
      setTimeout(() => {
        this.formStatus = null;
      }, 5000);
    }
  }

  getMessageLength(): number {
    const messageControl = this.contactForm.get('message');
    return messageControl?.value?.length || 0;
  }

  private async sendWithEmailJS(formData: ContactFormData): Promise<void> {
    console.log('🚀 Iniciando envío con EmailJS...');

    // Verificar EmailJS
    if (typeof (window as any).emailjs === 'undefined') {
      console.error('❌ EmailJS no está cargado');
      throw new Error('EmailJS no está disponible. Verifica el script en index.html');
    }

    // CONFIGURACIÓN - VERIFICA ESTOS VALORES EN TU DASHBOARD DE EMAILJS
    const serviceID = 'service_ukkqyzk';
    const templateID = 'template_f1az0ii';
    const publicKey = 'WvDL1iGiQxqlbwJNn';

    // PARÁMETROS SIMPLIFICADOS - SOLO LOS NECESARIOS
    const templateParams = {
      // Campos básicos que DEBEN coincidir con tu template
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      subject: this.getSubjectText(formData.subject),

      // Campos opcionales - solo si están en tu template
      phone: formData.phone || '',
      company: formData.company || '',

      // Campo para responder al usuario
      reply_to: formData.email
    };

    console.log('📝 Parámetros enviados:', templateParams);

    try {
      // USAR EL MÉTODO CORRECTO DE EMAILJS
      const response = await (window as any).emailjs.send(
        serviceID,
        templateID,
        templateParams,
        publicKey
      );

      console.log('✅ Respuesta exitosa:', response);
      return response;

    } catch (error: any) {
      console.error('❌ Error detallado:', error);

      // Manejo específico de errores 400
      if (error.status === 400) {
        console.error('🔍 Error 400 - Posibles causas:');
        console.error('1. Template ID incorrecto:', templateID);
        console.error('2. Service ID incorrecto:', serviceID);
        console.error('3. Parámetros no coinciden con el template');
        console.error('4. Template no está activo');

        throw new Error('Error 400: Verifica la configuración del template en EmailJS');
      }

      throw error;
    }
  }

  // Alternativa: Envío con backend propio
  private async sendWithBackend(formData: ContactFormData): Promise<void> {
    const emailData = {
      to: 'victoryorddiazgonzales@gmail.com',
      subject: `Nuevo contacto: ${this.getSubjectText(formData.subject)}`,
      html: this.generateEmailHTML(formData),
      attachments: await this.processAttachments()
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    try {
      const response = await this.http.post<any>('/api/send-email', emailData, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  private generateEmailHTML(formData: ContactFormData): string {
    const attachmentsList = this.selectedFiles.length > 0
      ? `<p><strong>Archivos adjuntos:</strong> ${this.selectedFiles.map(f => f.name).join(', ')}</p>`
      : '';

    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #3f51b5; margin-bottom: 20px; border-bottom: 2px solid #3f51b5; padding-bottom: 10px;">
            Nuevo Contacto desde el Portfolio
          </h2>

          <div style="margin-bottom: 20px;">
            <h3 style="color: #333; margin-bottom: 15px;">Información Personal:</h3>
            <p style="margin: 8px 0;"><strong>Nombre:</strong> ${formData.name}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> ${formData.email}</p>
            ${formData.phone ? `<p style="margin: 8px 0;"><strong>Teléfono:</strong> ${formData.phone}</p>` : ''}
            ${formData.company ? `<p style="margin: 8px 0;"><strong>Empresa:</strong> ${formData.company}</p>` : ''}
          </div>

          <div style="margin-bottom: 20px;">
            <h3 style="color: #333; margin-bottom: 15px;">Mensaje:</h3>
            <p style="margin: 8px 0;"><strong>Asunto:</strong> ${this.getSubjectText(formData.subject)}</p>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; border-left: 4px solid #3f51b5;">
              <p style="margin: 0; line-height: 1.6;">${formData.message.replace(/\n/g, '<br>')}</p>
            </div>
          </div>

          ${attachmentsList}

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>Este mensaje fue enviado desde tu portfolio web el ${new Date().toLocaleString('es-PE')}.</p>
          </div>
        </div>
      </div>
    `;
  }

  private async processAttachments(): Promise<any[]> {
    const attachments: any[] = [];

    for (const file of this.selectedFiles) {
      const base64 = await this.fileToBase64(file);
      attachments.push({
        filename: file.name,
        content: base64,
        encoding: 'base64'
      });
    }

    return attachments;
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          const base64 = (reader.result as string).split(',')[1];
          resolve(base64);
        } else {
          reject(new Error('Error al leer el archivo'));
        }
      };
      reader.onerror = error => reject(error);
    });
  }

  private getSubjectText(subject: string): string {
    const subjects: { [key: string]: string } = {
      'general': 'Consulta General',
      'project': 'Propuesta de Proyecto',
      'collaboration': 'Colaboración',
      'consultation': 'Consultoría',
      'other': 'Otro'
    };
    return subjects[subject] || subject;
  }

  private showSuccessMessage(): void {
    this.snackBar.open(
      '¡Mensaje enviado correctamente! Te responderé pronto.',
      'Cerrar',
      {
        duration: 5000,
        panelClass: ['success-snackbar'],
        horizontalPosition: 'right',
        verticalPosition: 'top'
      }
    );
  }

  private showErrorMessage(): void {
    this.snackBar.open(
      'Error al enviar el mensaje. Por favor, intenta nuevamente.',
      'Cerrar',
      {
        duration: 5000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'right',
        verticalPosition: 'top'
      }
    );
  }

  resetForm(): void {
    this.contactForm.reset();
    this.selectedFiles = [];
    this.formStatus = null;
  }

  getStatusMessage(): string {
    switch (this.formStatus) {
      case 'sending':
        return 'Enviando mensaje...';
      case 'success':
        return '¡Mensaje enviado correctamente!';
      case 'error':
        return 'Error al enviar el mensaje';
      default:
        return '';
    }
  }

  // Abrir redes sociales
  openRedes(url: string): void {
    const prefixedUrl = /^https?:\/\//.test(url) ? url : `https://${url}`;
    window.open(prefixedUrl, '_blank', 'noopener,noreferrer');
  }
}
