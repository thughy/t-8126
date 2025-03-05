
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';
import Header from '@/components/Header';
import { useApiKey } from '@/hooks/useApiKey';
import { API_KEY_INSTRUCTIONS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Alert,
  AlertDescription
} from '@/components/ui/alert';
import { 
  Key, 
  ExternalLink, 
  Info, 
  Save, 
  Loader2, 
  Trash2 
} from 'lucide-react';
import { motion } from 'framer-motion';

const Settings = () => {
  const navigate = useNavigate();
  const { apiKey, isLoading, saveApiKey, clearApiKey } = useApiKey();
  const [inputKey, setInputKey] = useState(apiKey);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveKey = async () => {
    setIsSaving(true);
    try {
      const success = saveApiKey(inputKey);
      if (success) {
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleClearKey = () => {
    if (window.confirm('Are you sure you want to remove your API key?')) {
      clearApiKey();
      setInputKey('');
    }
  };

  return (
    <>
      <Header />
      <PageTransition>
        <div className="container max-w-3xl pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="h-5 w-5 mr-2" />
                  API Key Settings
                </CardTitle>
                <CardDescription>
                  Manage your Spoonacular API key
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-6">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : (
                  <>
                    <Alert className="mb-6">
                      <Info className="h-4 w-4" />
                      <AlertDescription className="mt-0 ml-2">
                        Your API key is stored locally on your device and never sent to our servers.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="space-y-4">
                      <div dangerouslySetInnerHTML={{ __html: API_KEY_INSTRUCTIONS.replace(
                        '[Spoonacular API Portal](https://spoonacular.com/food-api)',
                        '<a href="https://spoonacular.com/food-api" target="_blank" rel="noopener noreferrer" class="text-primary underline flex items-center">Spoonacular API Portal <span class="inline-block ml-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></span></a>'
                      ) }} className="mb-6" />
                      
                      <div className="flex items-center space-x-3">
                        <Input
                          type="password"
                          placeholder="Enter your Spoonacular API key"
                          value={inputKey}
                          onChange={(e) => setInputKey(e.target.value)}
                          className="flex-1"
                        />
                        
                        <Button 
                          onClick={handleSaveKey} 
                          disabled={isSaving || !inputKey}
                        >
                          {isSaving ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Saving
                            </>
                          ) : (
                            <>
                              <Save className="h-4 w-4 mr-2" />
                              Save
                            </>
                          )}
                        </Button>
                      </div>
                      
                      {apiKey && (
                        <div className="flex justify-end mt-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={handleClearKey}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Remove Key
                          </Button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
              
              <CardFooter className="flex justify-between border-t pt-6">
                <Button 
                  variant="outline" 
                  onClick={() => navigate(-1)}
                >
                  Back
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => window.open('https://spoonacular.com/food-api/docs', '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  API Documentation
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </PageTransition>
    </>
  );
};

export default Settings;
