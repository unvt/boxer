require 'yaml'

CONFIG = YAML.load_file('config/default.yaml')

task :default do
  sh "node index.js < #{CONFIG['src_path']} > #{CONFIG['dst_path']}"
end
