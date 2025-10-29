  // LLM FEATURE: Generate Suggested Checklist
  const handleGenerateChecklist = async () => {
    if (!newAssetName || !newAssetCriticality) {
        setError("Necesitas al menos el Nombre y la Criticidad para generar una lista.");
        return;
    }

    setAiLoading(true);
    setError(null);

    const systemPrompt = `Eres un ingeniero de confiabilidad experto. Tu tarea es generar un JSON de 4 a 6 puntos de inspecciÃ³n visual y auditiva de rutina (diaria) para el activo proporcionado. CÃ©ntrate en fallos comunes detectables sin instrumentaciÃ³n avanzada. La respuesta DEBE ser un arreglo JSON de objetos, sin preÃ¡mbulos, explicaciones ni markdown envolvente (e.g., \`\`\`json).`;
    
    const userQuery = `Activo: "${newAssetName}". Criticidad: ${newAssetCriticality}.`;

    const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "ARRAY",
                items: {
                    type: "OBJECT",
                    properties: {
                        text: { type: "STRING", description: "La pregunta o punto de inspecciÃ³n, e.g., 'Detectar ruidos anÃ³malos o golpeteo.'" },
                        type: { type: "STRING", enum: ["boolean", "text"], description: "El tipo de entrada que necesita el inspector." }
                    },
                    propertyOrdering: ["text", "type"]
                }
            }
        }
    };

    try {
        const jsonText = await fetchGemini(payload);
        const suggestedChecklist = JSON.parse(jsonText);
        
        sessionStorage.setItem('suggestedChecklist', JSON.stringify(suggestedChecklist));
        setError("âœ¨ Checklist sugerido por IA listo. Â¡Presiona 'Guardar Activo' para almacenarlo!");

    } catch (e) {
        console.error("Error generating checklist:", e);
        setError(`Error del Generador IA: ${e.message}. Usando plantilla por defecto.`);
        sessionStorage.removeItem('suggestedChecklist');
    } finally {
        setAiLoading(false);
    }
  };

  // LLM FEATURE: Analyze Criticality
  const handleAnalyzeCriticality = async () => {
    if (!newAssetDescription) {
        setError("Por favor, introduce una DescripciÃ³n del activo para el anÃ¡lisis de criticidad.");
        return;
    }

    setAiLoading(true);
    setError(null);

    const systemPrompt = `Eres un Ingeniero de Confiabilidad. Analiza la siguiente descripciÃ³n de activo. Tu tarea es asignar la criticidad mÃ¡s adecuada (A, B, C o D) y justificar brevemente por quÃ©. La respuesta DEBE ser un objeto JSON de 2 campos, sin preÃ¡mbulos ni markdown envolvente.`;
    
    const userQuery = `DescripciÃ³n del Activo: "${newAssetDescription}". Basado en esta descripciÃ³n, asigna una criticidad entre A (Muy Alta) y D (Baja).`;

    const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "OBJECT",
                properties: {
                    criticality: { type: "STRING", enum: ["A", "B", "C", "D"] },
                    justification: { type: "STRING", description: "Breve justificaciÃ³n del por quÃ© de la criticidad asignada." }
                },
                propertyOrdering: ["criticality", "justification"]
            }
        }
    };

    try {
        const jsonText = await fetchGemini(payload);
        const analysis = JSON.parse(jsonText);
        
        setNewAssetCriticality(analysis.criticality);
        setError(`âœ¨ Criticidad sugerida por IA: ${analysis.criticality}. JustificaciÃ³n: ${analysis.justification}`);

    } catch (e) {
        console.error("Error analyzing criticality:", e);
        setError(`Error del Analizador IA: ${e.message}. No se pudo sugerir la criticidad.`);
    } finally {
        setAiLoading(false);
    }
  };


  // Function to add a new Asset
  const handleAddAsset = useCallback(async (e) => {
    e.preventDefault();
    if (!newAssetName || !db || !userId) {
      setError("El nombre del activo es obligatorio.");
      return;
    }

    setLoading(true);
    setError(null);

