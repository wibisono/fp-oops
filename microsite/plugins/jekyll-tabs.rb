module Tags
    class TabsBlock < Liquid::Block
        def render(context)
            '<div class="tab-content">' + super + '</div>'
        end
    end 

    class TabBlock < Liquid::Block
        def initialize(tag_name, tab, tokens)
            super
            @tab = tab.strip
        end

        def render(context)
            return "" if @tab.empty?

            site      = context.registers[:site]
            converter = site.find_converter_instance(Jekyll::Converters::Markdown)

            lines = super.rstrip.split(/\r\n|\r|\n/).select { |line| line.size > 0 }
            indentation = lines.map do |line|
                match = line.match(/^(\s+)[^\s]+/)
            match ? match[1].size : 0
            end
            indentation = indentation.min

            content = indentation ? super.gsub(/^#{' |\t' * indentation}/, '') : super
            content = converter.convert(content)
            content = content.strip # Strip again to avoid "\n"

            if @tab =~ /problem/i
                '<div role="tabpanel" id="' + @tab + '" class="tab-pane active">' + content + '</div>'
            else
                '<div role="tabpanel" id="' + @tab + '" class="tab-pane">' + content + '</div>'
            end 
        end
    end 
 end 


Liquid::Template.register_tag("tabs", Tags::TabsBlock)
Liquid::Template.register_tag("tab",  Tags::TabBlock)

